import {Request, Response} from "express";
import {IRegisterUserRequestDTO} from "./register-user-request-DTO";
import {RegisterUserUseCase} from "./register-user-use-case";

export class RegisterUserController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  async handle(request: Request, response: Response): Promise<unknown> {
    const {username, name, password}: IRegisterUserRequestDTO = request.body

    try {
      const createdUser = await this.registerUserUseCase.execute({username, name, password})
      return response.status(200).json(createdUser)
    } catch (error: any) {
      console.error(error)
      if (error.code)
        return response.status(400).json({success: false, code: error.code, message: error.message})

      return response.status(500).json({success: false, message: "Unexpected error, contact the developers", stack: error.stack})
    }
  }
}
