import {IMakePaymentRequestDTO} from "./make-payment-request-DTO";
import {IMakePaymentResponseDTO} from "./make-payment-response-DTO";
import {IGroupPlanRepository} from "../../repositories/IGroupPlanRepository";
import {IUserRepository} from "../../repositories/IUserRepository";
import {IPaymentRepository} from "../../repositories/IPaymentRepository";
import {Payment} from "../../entities/Payment";

export class MakePaymentUseCase {
  constructor(
    private paymentRepository: IPaymentRepository,
    private groupPlanRepository: IGroupPlanRepository,
  ) {}

  async execute(data: IMakePaymentRequestDTO): Promise<IMakePaymentResponseDTO> {
    const {authorizedUser, ammount, attachment, paymentDate, dueDate, groupId, description} = data

    const userGroupPlanFound = await this.groupPlanRepository.findUserGroupPlanByUserId(authorizedUser.getId(), data.groupId)
    if (!userGroupPlanFound) {
      throw {code: "", message: "User isn't in this group plan"}
    }

    //TODO: check if attachment is base64, pdf, jpeg, jpg or png
    //TODO: treat dates
    const newPayment = new Payment(ammount, paymentDate, dueDate, authorizedUser.getId(), groupId, description, attachment)

    const payment = await this.paymentRepository.create(newPayment)

    return {payment}
  }
}
