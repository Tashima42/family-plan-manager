import {User} from "../../entities/User";

export interface IGetGroupMembersRequestDTO {
  authorizedUser: User,
  groupId: number
}
