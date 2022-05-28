import {IGroupPlanRepository} from "../../IGroupPlanRepository";
import {GroupPlan} from "../../../entities/GroupPlan";
import {UserGroupPlan} from "../../../entities/UserGroupPlan";
import {PostgresDatabase} from "./index";
import {Roles} from "../../../entities/Roles";
import {User} from "../../../entities/User";

export class PostgresGroupRepository implements IGroupPlanRepository {
  constructor(private postgresDatabase: PostgresDatabase) {}

  async create(groupPlan: GroupPlan, adminId: number): Promise<GroupPlan> {
    // TODO: implement transaction
    const {rows: [created]} = await this.postgresDatabase.client.query(`INSERT INTO group_plan 
        (name, description, total_ammount, due_date) 
        VALUES ($1, $2, $3, $4) RETURNING id`,
      [
        groupPlan.getName(),
        groupPlan.getDescription(),
        groupPlan.getTotalAmmount(),
        groupPlan.getDueDate()
      ]
    )
    groupPlan.setId(created.id)

    const userGroupPlan = new UserGroupPlan(adminId, groupPlan.getId(), Roles.admin)
    await this.createUserGroupPlan(userGroupPlan)

    return groupPlan
  }
  async createUserGroupPlan(userGroupPlan: UserGroupPlan): Promise<UserGroupPlan> {
    const {rows: [created]} = await this.postgresDatabase.client.query(`INSERT INTO user_group_plan (user_id, group_plan_id, role) VALUES ($1, $2, $3) RETURNING id`,
      [
        userGroupPlan.getUserId(),
        userGroupPlan.getGroupPlanId(),
        userGroupPlan.getRole()
      ]
    )
    userGroupPlan.setId(created.id)
    return userGroupPlan
  }
  async findUserGroupPlanByUserId(userId: number, groupId: number): Promise<UserGroupPlan> {
    const {rows: [userGroupPlanFound]} = await this.postgresDatabase.client.query(`SELECT user_id, group_plan_id, role, id FROM user_group_plan WHERE user_id = $1 AND group_plan_id = $2 LIMIT 1;`, [userId, groupId])
    if (!userGroupPlanFound) throw {code: "RS-IS-SE-GPR-001", message: "Group not found"}
    const userGroupPlan = new UserGroupPlan(
      userGroupPlanFound.user_id,
      userGroupPlanFound.group_plan_id,
      userGroupPlanFound.role,
      userGroupPlanFound.id,
    )
    return userGroupPlan
  }
  async findAllByUserId(userId: number): Promise<Array<{groupPlan: GroupPlan, userGroupPlan: UserGroupPlan}>> {
    const {rows: userGroupsFound} = await this.postgresDatabase.client.query(`SELECT
      "user_group_plan".user_id AS "user_id", 
      "group_plan".name AS group_name,
      "group_plan".description AS description, 
      "group_plan".total_ammount AS total_ammount, 
      "group_plan".due_date AS due_date, 
      "user_group_plan".role AS role,
      "group_plan".id AS group_id
    FROM "user_group_plan" JOIN "group_plan"
    ON "user_group_plan".group_plan_id = "group_plan".id
    WHERE "user_id" = $1;`,
      [userId])
    if (!userGroupsFound) throw {code: "RS-IS-SE-GPR-002", message: "User groups not found"}

    const userGroups = userGroupsFound.map((userGroupFound: any) => {
      return {
        groupPlan: new GroupPlan(
          userGroupFound.group_name,
          userGroupFound.description,
          userGroupFound.total_ammount,
          userGroupFound.due_date,
          userGroupFound.group_id
        ),
        userGroupPlan: new UserGroupPlan(
          userGroupFound.user_id,
          userGroupFound.group_id,
          userGroupFound.role,
          userGroupFound.id,
        )
      }
    })
    return userGroups;
  }
  async findAllByGroupId(groupId: number): Promise<Array<{user: User, userGroupPlan: UserGroupPlan}>> {
    const text = `SELECT u.id AS user_id, u.name AS user_name, u.username AS user_username, ugp.role AS role, ugp.group_plan_id AS group_plan_id, ugp.id AS user_group_plan_id FROM user_group_plan ugp JOIN "user" u ON u.id = ugp.user_id WHERE ugp.group_plan_id = $1;`
    const {rows: userGroupsFound} = await this.postgresDatabase.client.query(text,
      [groupId])
    if (!userGroupsFound) throw {code: "RS-IS-SE-GPR-003", message: "User groups not found"}

    const userGroups = userGroupsFound.map((userGroupFound: any) => {
      return {
        user: new User(userGroupFound.user_username, userGroupFound.user_name, null, userGroupFound.user_id),
        userGroupPlan: new UserGroupPlan(
          userGroupFound.user_id,
          userGroupFound.group_plan_id,
          userGroupFound.role,
          userGroupFound.user_group_plan_id,
        )
      }
    })
    return userGroups;
  }
}
