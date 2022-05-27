import {IGetGroupPaymentsRequestDTO} from "./get-group-payments-request-DTO";
import {IGetGroupPaymentsResponseDTO} from "./get-group-payments-response-DTO";
import {IPaymentRepository} from "../../repositories/IPaymentRepository";
import {IGroupPlanRepository} from "../../repositories/IGroupPlanRepository";
import {Roles} from "../../entities/Roles";
import {UserGroupPlan} from "../../entities/UserGroupPlan";

export class GetGroupPaymentsUseCase {
  constructor(
    private paymentRepository: IPaymentRepository,
    private groupPlanRepository: IGroupPlanRepository
  ) {}

  async execute(data: IGetGroupPaymentsRequestDTO): Promise<IGetGroupPaymentsResponseDTO> {
    const {authorizedUser, groupId} = data

    let userGroupFound: UserGroupPlan = null
    try {
      userGroupFound = await this.groupPlanRepository.findUserGroupPlanByUserId(authorizedUser.getId(), groupId)
    } catch (e) {
      if (e.code !== "RS-IS-SE-GPR-001") throw e
    }
    if (!userGroupFound) {
      throw {code: "UC-GGP-001", message: "Group doesn't exists or user doesn't belongs to this group"}
    }
    if (userGroupFound.getRole() !== Roles.admin) {
      throw {code: "UC-GGP-002", message: "User isn't admin in this group"}
    }

    const payments = await this.paymentRepository.findAllByGroupId(groupId)

    return {payments}
  }
}
