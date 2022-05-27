import {User} from "../../entities/User";

export interface IGetGroupPaymentsRequestDTO {
  authorizedUser: User,
  groupId: number,
}
