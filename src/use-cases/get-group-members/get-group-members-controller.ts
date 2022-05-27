import {Request, Response} from "express";
import {IGetGroupMembersRequestDTO} from "./get-group-members-request-DTO";
import {IGetGroupMembersResponseDTO} from "./get-group-members-response-DTO";
import {GetUserGroupPlansUseCase} from "./get-group-members-use-case";

export class GetGroupMembersController {
  constructor(private getGroupMembersUseCase: GetUserGroupPlansUseCase) {}

  async handle(request: Request, response: Response): Promise<unknown> {
    const {authorizedUser}: IGetGroupMembersRequestDTO = request.body
    const groupId = parseInt(request.query.groupId as any)

    try {
      const groupPlans: IGetGroupMembersResponseDTO = await this.getGroupMembersUseCase.execute({authorizedUser, groupId})
      return response.status(200).json(groupPlans)
    } catch (error: any) {
      console.error(error)
      if (error.code)
        return response.status(400).json({success: false, code: error.code, message: error.message})

      return response.status(500).json({success: false, message: "Unexpected error, contact the developers", stack: error.stack})
    }
  }
}
