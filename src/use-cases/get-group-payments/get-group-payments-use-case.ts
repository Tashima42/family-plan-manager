import {IGetGroupPaymentsRequestDTO} from "./get-group-payments-request-DTO";
import {IGetGroupPaymentsResponseDTO} from "./get-group-payments-response-DTO";
import {IPaymentRepository} from "../../repositories/IPaymentRepository";
import {IGroupPlanRepository} from "../../repositories/IGroupPlanRepository";

export class GetGroupPaymentsUseCase {
  constructor(
    private paymentRepository: IPaymentRepository,
    private groupPlanRepository: IGroupPlanRepository
  ) {}

  async execute(data: IGetGroupPaymentsRequestDTO): Promise<IGetGroupPaymentsResponseDTO> {
    const {authorizedUser, groupId} = data

    const userGroupFound = await this.groupPlanRepository.findUserGroupPlanByUserId(authorizedUser.getId(), groupId)
    if (!userGroupFound) {
      throw {code: "", message: "User doesn't belongs to this group"}
    }
    if (userGroupFound.getRole() !== "urn:familymanager:role:admin") {
      throw {code: "", message: "User isn't admin in this group"}
    }

    const payments = await this.paymentRepository.findAllByGroupId(groupId)

    return {payments}
  }
}
