import {IAuthenticateUserRequestDTO} from "./authenticate-user-request-DTO";
import {IAuthorizationTokenRepository} from "../../repositories/IAuthorizationTokenRepository";
import {IUserRepository} from "../../repositories/IUserRepository";
import {AuthorizationToken} from "../../entities/AuthorizationToken";
import {ICryptoHelper} from "../../helpers/ICryptoHelper";
import {User} from "../../entities/User";

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authorizationTokenRepository: IAuthorizationTokenRepository,
    private cryptoHelper: ICryptoHelper
  ) {}

  async execute(data: IAuthenticateUserRequestDTO): Promise<string> {
    const {username, password: plainPassword} = data

    // Get user information
    const userFound = await this.userRepository.findByUsername(username)
    if (!userFound) throw {code: "UC-AU-001", message: "User not found"}
    // Extract hashed password from user
    const hashedPassword = userFound.getPassword()
    // Compare plain password with hashed password
    const isPasswordCorrect = await this.cryptoHelper.compareBcrypt(plainPassword, hashedPassword)
    if (!isPasswordCorrect) throw {code: "UC-AU-002", message: "Incorrect password"}
    // Generate authorization code for the user
    const authorizationCode = await this.generateAuthorizationToken(userFound)

    return authorizationCode
  }

  private async generateAuthorizationToken(user: User): Promise<string> {
    const token = this.cryptoHelper.generateRandomHash()
    const authorizationToken = new AuthorizationToken(token, user)
    // Create authorizationToken
    const createdAuthorizationCode = await this.authorizationTokenRepository.create(authorizationToken)
    if (!createdAuthorizationCode) throw {code: "UC-AU-005", message: "Failed to create code"}
    return token
  }
}
