import {User} from "../../entities/User";

export interface IMakePaymentRequestDTO {
  authorizedUser: User,
  groupId: number,
  ammount: string,
  attachment: string,
  paymentDate: Date,
  dueDate: Date,
  description: string
}

