import {Request, Response} from "express";
import {IAddMemberToGroupPlanRequestDTO} from "./add-member-to-group-plan-request-DTO";
import {IAddMemberToGroupPlanResponseDTO} from "./add-member-to-group-plan-response-DTO";
import {AddMemberToGroupPlanUseCase} from "./add-member-to-group-plan-use-case";

export class AddMemberToGroupPlanController {
  constructor(private addMemberToGroupPlanUseCase: AddMemberToGroupPlanUseCase) {}

  async handle(request: Request, response: Response): Promise<unknown> {
    const {authorizedUser, memberUsername, groupId}: IAddMemberToGroupPlanRequestDTO = request.body

    try {
      const userGroupPlan: IAddMemberToGroupPlanResponseDTO = await this.addMemberToGroupPlanUseCase.execute({authorizedUser, memberUsername, groupId})
      return response.status(200).json(userGroupPlan)
    } catch (error: any) {
      console.error(error)
      if (error.code)
        return response.status(400).json({success: false, code: error.code, message: error.message})

      return response.status(500).json({success: false, message: "Unexpected error, contact the developers", stack: error.stack})
    }
  }
}
