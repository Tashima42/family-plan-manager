import {IGroupPlanRepository} from "../../IGroupPlanRepository";
import {GroupPlan} from "../../../entities/GroupPlan";
import {UserGroupPlan} from "../../../entities/UserGroupPlan";
import {SqliteDatabase} from "./index";
import {Roles} from "../../../entities/Roles";
import {User} from "../../../entities/User";

export class SqliteGroupRepository implements IGroupPlanRepository {
  constructor(private sqliteDatabase: SqliteDatabase) {}

  async create(groupPlan: GroupPlan, adminId: number): Promise<GroupPlan> {
    const db = await this.sqliteDatabase.connect()
    const created = await db.run(`INSERT INTO group_plan 
        (name, description, total_ammount, due_date) 
        VALUES (?, ?, ?, ?)`,
      groupPlan.getName(),
      groupPlan.getDescription(),
      groupPlan.getTotalAmmount(),
      groupPlan.getDueDate().toISOString()
    )
    groupPlan.setId(created.lastID)

    const userGroupPlan = new UserGroupPlan(adminId, groupPlan.getId(), Roles.admin)
    await this.createUserGroupPlan(userGroupPlan)

    return groupPlan
  }
  async createUserGroupPlan(userGroupPlan: UserGroupPlan): Promise<UserGroupPlan> {
    const db = await this.sqliteDatabase.connect()
    const created = await db.run(`INSERT INTO user_group_plan (user_id, group_plan_id, role) VALUES (?, ?, ?)`,
      userGroupPlan.getUserId(),
      userGroupPlan.getGroupPlanId(),
      userGroupPlan.getRole()
    )
    userGroupPlan.setId(created.lastID)
    return userGroupPlan
  }
  async findUserGroupPlanByUserId(userId: number, groupId: number): Promise<UserGroupPlan> {
    const db = await this.sqliteDatabase.connect()
    const userGroupPlanFound = await db.get(`SELECT user_id, group_plan_id, role, id FROM user_group_plan WHERE user_id = ? AND group_plan_id = ?;`, userId, groupId)
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
    const db = await this.sqliteDatabase.connect()

    let userGroupsFound = await db.all(`SELECT
      user_group_plan.user_id AS user_id, 
      group_plan.name AS group_name,
      group_plan.description AS description, 
      group_plan.total_ammount AS total_ammount, 
      group_plan.due_date AS due_date, 
      user_group_plan.role AS role,
      group_plan.id AS group_id
    FROM user_group_plan JOIN group_plan
    WHERE user_id = ? AND user_group_plan.group_plan_id = group_plan.id;`,
      userId)
    if (!userGroupsFound) throw {code: "RS-IS-SE-GPR-002", message: "User groups not found"}
    if (!Array.isArray(userGroupsFound)) userGroupsFound = [userGroupsFound]

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
    const db = await this.sqliteDatabase.connect()

    let userGroupsFound = await db.all(` SELECT
      user.id AS user_id,
      user.name AS user_name,
      user.username AS user_username,
      user_group_plan.role AS role,
      user_group_plan.group_plan_id AS group_plan_id,
      user_group_plan.id AS user_group_plan_id
    FROM
      user_group_plan
      JOIN user
    WHERE
      user_group_plan.group_plan_id = ?
      AND user_group_plan.user_id = user.id; `,
      groupId)
    if (!userGroupsFound) throw {code: "RS-IS-SE-GPR-003", message: "User groups not found"}
    if (!Array.isArray(userGroupsFound)) userGroupsFound = [userGroupsFound]

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
