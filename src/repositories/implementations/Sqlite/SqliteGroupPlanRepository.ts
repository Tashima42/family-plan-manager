import {IGroupPlanRepository} from "../../IGroupPlanRepository";
import {GroupPlan} from "../../../entities/GroupPlan";
import {UserGroupPlan} from "../../../entities/UserGroupPlan";
import {SqliteDatabase} from "./index";

export class SqliteGroupRepository implements IGroupPlanRepository {
  constructor(private sqliteDatabase: SqliteDatabase) {}

  async create(groupPlan: GroupPlan, adminId: number): Promise<GroupPlan> {
    const db = await this.sqliteDatabase.connect()
    const created = await db.run(`INSERT INTO group_plan 
        (name, description) 
        VALUES (?, ?)`,
      groupPlan.getName(),
      groupPlan.getDescription()
    )
    groupPlan.setId(created.lastID)

    await db.run(`INSERT INTO user_group_plan (user_id, group_plan_id, role) VALUES (?, ?, ?)`,
      adminId,
      groupPlan.getId(),
      'urn:familymanager:role:admin' //TODO:  make enum to roles
    )
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
    if (!userGroupPlanFound) throw {code: "RS-IS-SE-GR-002", message: "Group not found"}
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
      user_group_plan.role AS role,
      group_plan.id AS group_id
    FROM user_group_plan JOIN group_plan
    WHERE user_id = ? AND user_group_plan.group_plan_id = group_plan.id;`,
      userId)
    if (!userGroupsFound) throw {code: "RS-IS-SE-GR-003", message: "User groups not found"}
    if (!Array.isArray(userGroupsFound)) userGroupsFound = [userGroupsFound]

    const userGroups = userGroupsFound.map((userGroupFound: any) => {
      return {
        groupPlan: new GroupPlan(
          userGroupFound.group_name,
          userGroupFound.description,
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
}
