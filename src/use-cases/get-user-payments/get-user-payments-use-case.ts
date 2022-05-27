import {IGetUserPaymentsRequestDTO} from "./get-user-payments-request-DTO";
import {IGetUserPaymentsResponseDTO} from "./get-user-payments-response-DTO";
import {IPaymentRepository} from "../../repositories/IPaymentRepository";

export class GetUserPaymentsUseCase {
  constructor(
    private paymentRepository: IPaymentRepository
  ) {}

  async execute(data: IGetUserPaymentsRequestDTO): Promise<IGetUserPaymentsResponseDTO> {
    const {authorizedUser} = data

    const payments = await this.paymentRepository.findAllByUserId(authorizedUser.getId())

    return {payments}
  }
}
