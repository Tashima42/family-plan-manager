import {GroupPlan} from "../entities/GroupPlan";
import {User} from "../entities/User";
import {UserGroupPlan} from "../entities/UserGroupPlan";

export interface IGroupPlanRepository {
  create(group: GroupPlan, adminId: number): Promise<GroupPlan>
  createUserGroupPlan(userGroupPlan: UserGroupPlan): Promise<UserGroupPlan>
  findAllByUserId(userId: number): Promise<Array<{groupPlan: GroupPlan, userGroupPlan: UserGroupPlan}>>
  findUserGroupPlanByUserId(userId: number, groupId: number): Promise<UserGroupPlan>
  findAllByGroupId(groupId: number): Promise<Array<{user: User, userGroupPlan: UserGroupPlan}>>
}
