import {User} from "../../entities/User";
import {IAuthorizationTokenRepository} from "../../repositories/IAuthorizationTokenRepository";

export class AuthorizeUserUseCase {
  constructor(private authorizationTokenRepository: IAuthorizationTokenRepository) {}

  async execute(token: string): Promise<User> {
    console.log(token)
    const authorizationTokenFound = await this.authorizationTokenRepository.getByToken(token)
    console.log(authorizationTokenFound)
    if (!authorizationTokenFound) throw {code: "UC-AEU-001", message: "Authorization Token not found"}
    return authorizationTokenFound.getUser()
  }
}
