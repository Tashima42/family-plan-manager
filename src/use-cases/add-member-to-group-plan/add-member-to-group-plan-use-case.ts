import {IAddMemberToGroupPlanRequestDTO} from "./add-member-to-group-plan-request-DTO";
import {IAddMemberToGroupPlanResponseDTO} from "./add-member-to-group-plan-response-DTO";
import {IGroupPlanRepository} from "../../repositories/IGroupPlanRepository";
import {IUserRepository} from "../../repositories/IUserRepository";
import {UserGroupPlan} from "../../entities/UserGroupPlan";

export class AddMemberToGroupPlanUseCase {
  constructor(
    private groupPlanRepository: IGroupPlanRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute(data: IAddMemberToGroupPlanRequestDTO): Promise<IAddMemberToGroupPlanResponseDTO> {
    const {authorizedUser} = data

    const adminUserGroupPlan = await this.groupPlanRepository.findUserGroupPlanByUserId(authorizedUser.getId(), data.groupId)
    if (adminUserGroupPlan.getRole() !== "urn:familymanager:role:admin") {
      throw {code: "", message: "User isn't admin to this group"}
    }

    const member = await this.userRepository.findByUsername(data.memberUsername)
    if (!member) {
      throw {code: "", message: "Member username not found"}
    }

    let userGroupPlanFound: UserGroupPlan = null
    try {
      userGroupPlanFound = await this.groupPlanRepository.findUserGroupPlanByUserId(member.getId(), data.groupId)
    } catch (e) {
      if (e.code !== "RS-IS-SE-GR-002") throw e
    }
    if (userGroupPlanFound) {
      throw {code: "", message: "User already is in this group plan"}
    }

    const newUserGroupPlan = new UserGroupPlan(member.getId(), data.groupId, "urn:familymanager:role:member")
    const userGroupPlan = await this.groupPlanRepository.createUserGroupPlan(newUserGroupPlan)

    return {userGroupPlan}
  }
}
