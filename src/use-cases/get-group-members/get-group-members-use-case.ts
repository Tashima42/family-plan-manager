import {IGetGroupMembersRequestDTO} from "./get-group-members-request-DTO";
import {IGetGroupMembersResponseDTO} from "./get-group-members-response-DTO";
import {IGroupPlanRepository} from "../../repositories/IGroupPlanRepository";

export class GetUserGroupPlansUseCase {
  constructor(
    private groupRepository: IGroupPlanRepository
  ) {}

  async execute(data: IGetGroupMembersRequestDTO): Promise<IGetGroupMembersResponseDTO> {
    const {authorizedUser, groupId} = data

    const foundUserGroupPlan = await this.groupRepository.findUserGroupPlanByUserId(authorizedUser.getId(), groupId)
    if (!foundUserGroupPlan) {
      throw {code: "UC-GGM-001", message: "User does not belong to this group"}
    }
    const userGroupPlans = await this.groupRepository.findAllByGroupId(groupId)

    const members = userGroupPlans.map((group) => {
      console.log(group)
      return {
        name: group.user.getName(),
        username: group.user.getUsername(),
        id: group.user.getId(),
        role: group.userGroupPlan.getRole(),
      }
    })

    return {members}
  }
}
