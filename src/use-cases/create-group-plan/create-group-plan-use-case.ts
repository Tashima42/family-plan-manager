import {ICreateGroupPlanRequestDTO} from "./create-group-plan-request-DTO";
import {ICreateGroupPlanResponseDTO} from "./create-group-plan-response-DTO";
import {IGroupPlanRepository} from "../../repositories/IGroupPlanRepository";
import {GroupPlan} from "../../entities/GroupPlan";

export class CreateGroupPlanUseCase {
  constructor(
    private groupPlanRepository: IGroupPlanRepository
  ) {}

  async execute(data: ICreateGroupPlanRequestDTO): Promise<ICreateGroupPlanResponseDTO> {
    const {authorizedUser, name, description, totalAmmount, dueDate} = data

    const newGroupPlan = new GroupPlan(name, description, totalAmmount, dueDate)
    const groupPlan = await this.groupPlanRepository.create(newGroupPlan, authorizedUser.getId())

    return {groupPlan}
  }
}
