import {Payment} from "../entities/Payment"
export interface IPaymentRepository {
  create(payment: Payment): Promise<Payment>
  findAllByUserId(userId: number): Promise<Array<Payment>>
  findAllByGroupId(groupId: number): Promise<Array<Payment>>
}
