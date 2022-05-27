import {IAddMemberToGroupPlanRequestDTO} from "./add-member-to-group-plan-request-DTO";
import {IAddMemberToGroupPlanResponseDTO} from "./add-member-to-group-plan-response-DTO";
import {IGroupPlanRepository} from "../../repositories/IGroupPlanRepository";
import {IUserRepository} from "../../repositories/IUserRepository";
import {UserGroupPlan} from "../../entities/UserGroupPlan";
import {Roles} from "../../entities/Roles";

export class AddMemberToGroupPlanUseCase {
  constructor(
    private groupPlanRepository: IGroupPlanRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute(data: IAddMemberToGroupPlanRequestDTO): Promise<IAddMemberToGroupPlanResponseDTO> {
    const {authorizedUser} = data

    const adminUserGroupPlan = await this.groupPlanRepository.findUserGroupPlanByUserId(authorizedUser.getId(), data.groupId)
    if (adminUserGroupPlan.getRole() !== Roles.admin) {
      throw {code: "UC-AMTG-001", message: "User isn't admin to this group"}
    }

    const member = await this.userRepository.findByUsername(data.memberUsername)
    if (!member) {
      throw {code: "UC-AMTG-002", message: "Member username not found"}
    }

    let userGroupPlanFound: UserGroupPlan = null
    try {
      userGroupPlanFound = await this.groupPlanRepository.findUserGroupPlanByUserId(member.getId(), data.groupId)
    } catch (e) {
      if (e.code !== "RS-IS-SE-GPR-001") throw e
    }
    if (userGroupPlanFound) {
      throw {code: "UC-AMTG-003", message: "User already is in this group plan"}
    }

    const newUserGroupPlan = new UserGroupPlan(member.getId(), data.groupId, Roles.member)
    const userGroupPlan = await this.groupPlanRepository.createUserGroupPlan(newUserGroupPlan)

    return {userGroupPlan}
  }
}
