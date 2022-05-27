import {User} from "../../entities/User";

export interface IMakePaymentRequestDTO {
  authorizedUser: User,
  groupId: number,
  ammount: number,
  attachment: string,
  date: Date,
  description: string
}

