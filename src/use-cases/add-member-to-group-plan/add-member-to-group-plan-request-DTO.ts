import {User} from "../../entities/User";

export interface IAddMemberToGroupPlanRequestDTO {
  authorizedUser: User,
  memberUsername: string,
  groupId: number
}
