import {Payment} from "../../entities/Payment"
export interface IGetUserPaymentsResponseDTO {
  payments: Array<Payment>
}
