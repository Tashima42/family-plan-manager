import {Request, Response} from "express";
import {IGetUserGroupsPlansRequestDTO} from "./get-user-groups-plans-request-DTO";
import {IGetUserGroupsPlansResponseDTO} from "./get-user-groups-plans-response-DTO";
import {GetUserGroupPlansUseCase} from "./get-user-groups-plans-use-case";

export class GetUserGroupsPlansController {
  constructor(private getUserGroupsPlansUseCase: GetUserGroupPlansUseCase) {}

  async handle(request: Request, response: Response): Promise<unknown> {
    const {authorizedUser}: IGetUserGroupsPlansRequestDTO = request.body

    try {
      const groupPlans: IGetUserGroupsPlansResponseDTO = await this.getUserGroupsPlansUseCase.execute({authorizedUser})
      return response.status(200).json(groupPlans)
    } catch (error: any) {
      console.error(error)
      if (error.code === "UC-GUG-001")
        return response.status(404).json({success: false, message: error.message})
      if (error.code === "UC-GUG-002")
        return response.status(401).json({success: false, message: error.message})

      return response.status(500).json({success: false, message: "Unexpected error, contact the developers", stack: error.stack})
    }
  }
}
