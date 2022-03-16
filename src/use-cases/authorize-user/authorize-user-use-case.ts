import {User} from "../../entities/User";
import {IAuthorizationTokenRepository} from "../../repositories/IAuthorizationTokenRepository";

export class AuthorizeUserUseCase {
  constructor(private authorizationTokenRepository: IAuthorizationTokenRepository) {}

  async execute(token: string): Promise<User> {
    const authorizationTokenFound = await this.authorizationTokenRepository.getByToken(token)
    if (!authorizationTokenFound) throw {code: "UC-AEU-003", message: "Authorization Token not found"}
    return authorizationTokenFound.getUser()
  }
}
