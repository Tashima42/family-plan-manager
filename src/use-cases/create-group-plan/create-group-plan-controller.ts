import {Request, Response} from "express";
import {ICreateGroupPlanRequestDTO} from "./create-group-plan-request-DTO";
import {ICreateGroupPlanResponseDTO} from "./create-group-plan-response-DTO";
import {CreateGroupPlanUseCase} from "./create-group-plan-use-case";

export class CreateGroupPlanController {
  constructor(private createGroupPlanUseCase: CreateGroupPlanUseCase) {}

  async handle(request: Request, response: Response): Promise<unknown> {
    const {authorizedUser, name, description, totalAmmount, dueDate}: ICreateGroupPlanRequestDTO = request.body

    try {
      const groupPlan: ICreateGroupPlanResponseDTO = await this.createGroupPlanUseCase.execute({authorizedUser, name, description, totalAmmount, dueDate: new Date(dueDate)})
      return response.status(200).json(groupPlan)
    } catch (error: any) {
      console.error(error)
      if (error.code)
        return response.status(400).json({success: false, code: error.code, message: error.message})

      return response.status(500).json({success: false, message: "Unexpected error, contact the developers", stack: error.stack})
    }
  }
}
