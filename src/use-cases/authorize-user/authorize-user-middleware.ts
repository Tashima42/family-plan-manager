import {NextFunction, Request, Response} from "express";
import {AuthorizeUserUseCase} from "./authorize-user-use-case";

export class AuthorizeUserMiddleware {
  constructor(private authorizeUserUseCase: AuthorizeUserUseCase, private test: string) {}

  async handle(request: Request, response: Response, next: NextFunction): Promise<unknown> {
    const token = request.headers.authorization.split("Bearer ")[1]
    try {
      await this.authorizeUserUseCase.execute(token)
      /*
      const user = await this.authorizeUserUseCase.execute(token)
      request.body.user = user
      */
      next()
    } catch (error: any) {
      console.error(error)
      return response.status(500).json({success: false, message: "Unexpected error, contact the developers", stack: error.stack})
    }
  }
}
