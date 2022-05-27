import {Request, Response} from "express";
import {IGetUserPaymentsRequestDTO} from "./get-user-payments-request-DTO";
import {IGetUserPaymentsResponseDTO} from "./get-user-payments-response-DTO";
import {GetUserPaymentsUseCase} from "./get-user-payments-use-case";

export class GetUserPaymentsController {
  constructor(private getUserPaymentsUseCase: GetUserPaymentsUseCase) {}

  async handle(request: Request, response: Response): Promise<unknown> {
    const {authorizedUser}: IGetUserPaymentsRequestDTO = request.body

    try {
      const payments: IGetUserPaymentsResponseDTO = await this.getUserPaymentsUseCase.execute({authorizedUser})
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
