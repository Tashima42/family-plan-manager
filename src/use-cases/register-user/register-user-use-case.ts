import {IRegisterUserRequestDTO} from "./register-user-request-DTO";
import {IUserRepository} from "../../repositories/IUserRepository";
import {ICryptoHelper} from "../../helpers/ICryptoHelper";
import {User} from "../../entities/User";
import {IRegisterUserResponseDTO} from "./register-user-response-DTO";

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private cryptoHelper: ICryptoHelper
  ) {}

  async execute(data: IRegisterUserRequestDTO): Promise<IRegisterUserResponseDTO> {
    const {username, name, password: plainPassword} = data

    let userFound: User = null
    try {
      userFound = await this.userRepository.findByUsername(username)
    } catch (e) {
      if (e.code !== "RS-IS-SE-UR-001") throw e
    }
    if (userFound) throw {code: "UC-RU-001", message: "Username already exists"}

    const hashedPassword = await this.cryptoHelper.hashBcrypt(plainPassword)

    const user = new User(username, name, hashedPassword)

    const createdUser = await this.userRepository.create(user)

    createdUser.setPassword(null)

    return {user: createdUser}
  }
}
