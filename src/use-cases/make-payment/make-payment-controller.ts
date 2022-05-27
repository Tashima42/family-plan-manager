import {Request, Response} from "express";
import {IMakePaymentRequestDTO} from "./make-payment-request-DTO";
import {IMakePaymentResponseDTO} from "./make-payment-response-DTO";
import {MakePaymentUseCase} from "./make-payment-use-case";

export class MakePaymentController {
  constructor(private makePaymentUseCase: MakePaymentUseCase) {}

  async handle(request: Request, response: Response): Promise<unknown> {
    const {authorizedUser, groupId, ammount, attachment, date, description}: IMakePaymentRequestDTO = request.body

    try {
      const payment: IMakePaymentResponseDTO = await this.makePaymentUseCase.execute({authorizedUser, groupId, ammount, attachment, date: new Date(date), description})
      return response.status(200).json(payment)
    } catch (error: any) {
      console.error(error)
      if (error.code)
        return response.status(400).json({success: false, code: error.code, message: error.message})

      return response.status(500).json({success: false, message: "Unexpected error, contact the developers", stack: error.stack})
    }
  }
}
