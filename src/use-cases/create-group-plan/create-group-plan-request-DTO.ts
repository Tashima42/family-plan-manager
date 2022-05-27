import {User} from "../../entities/User";

export interface ICreateGroupPlanRequestDTO {
  authorizedUser: User,
  name: string,
  description: string
}
