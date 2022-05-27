import {Request, Response} from "express";
import {IGetGroupPaymentsRequestDTO} from "./get-group-payments-request-DTO";
import {IGetGroupPaymentsResponseDTO} from "./get-group-payments-response-DTO";
import {GetGroupPaymentsUseCase} from "./get-group-payments-use-case";

export class GetGroupPaymentsController {
  constructor(private getGroupPaymentsUseCase: GetGroupPaymentsUseCase) {}

  async handle(request: Request, response: Response): Promise<unknown> {
    const {authorizedUser} = request.body
    const groupId = parseInt(request.query.groupId as any)
    const requestDto: IGetGroupPaymentsRequestDTO = {authorizedUser, groupId}

    try {
      const payments: IGetGroupPaymentsResponseDTO = await this.getGroupPaymentsUseCase.execute(requestDto)
      return response.status(200).json(payments)
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
