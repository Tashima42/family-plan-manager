import {IGetUserGroupsPlansRequestDTO} from "./get-user-groups-plans-request-DTO";
import {IGetUserGroupsPlansResponseDTO} from "./get-user-groups-plans-response-DTO";
import {IGroupPlanRepository} from "../../repositories/IGroupPlanRepository";

export class GetUserGroupPlansUseCase {
  constructor(
    private groupRepository: IGroupPlanRepository
  ) {}

  async execute(data: IGetUserGroupsPlansRequestDTO): Promise<IGetUserGroupsPlansResponseDTO> {
    const {authorizedUser} = data

    const userGroupPlans = await this.groupRepository.findAllByUserId(authorizedUser.getId())

    const groupPlans = userGroupPlans.map((group) => {
      return {
        name: group.groupPlan.getName(),
        description: group.groupPlan.getDescription(),
        role: group.userGroupPlan.getRole(),
        id: group.groupPlan.getId(),
      }
    })

    return {groupPlans}
  }
}
