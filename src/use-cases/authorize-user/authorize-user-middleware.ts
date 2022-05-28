import {NextFunction, Request, Response} from "express";
import {AuthorizeUserUseCase} from "./authorize-user-use-case";

export class AuthorizeUserMiddleware {
  constructor(private authorizeUserUseCase: AuthorizeUserUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction): Promise<unknown> {
    try {
      if (!request.headers.authorization) throw {code: "UC-AEU-001", message: "Missing Authorization header"}
      if (!request.headers.authorization.includes("Bearer")) throw {code: "UC-AEU-002", message: "Authorization must be of type Bearer"}
      const token = request.headers.authorization.split("Bearer ")[1]
      const user = await this.authorizeUserUseCase.execute(token)
      request.body.authorizedUser = user
      next()
    } catch (error: any) {
      console.error(error)
      if (error.code) {
        if (error.code == "RS-IS-SE-AT-001") {
          return response.status(401).json({success: false, message: error.message})
        }
      }
      return response.status(500).json({success: false, message: "Unexpected error, contact the developers", stack: error.stack})
    }
  }
}
