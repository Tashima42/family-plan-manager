import {AuthenticateUserUseCase} from "./authenticate-user-use-case";
import {AuthenticateUserController} from "./authenticate-user-controller";
import {CryptoHelper} from "../../helpers/implementations/CryptoHelper";
import {PostgresUserRepository} from "../../repositories/implementations/Postgres/PostgresUserRepository";
import {PostgresAuthorizationTokenRepository} from "../../repositories/implementations/Postgres/PostgresAuthorizationTokenRepository";
import {postgresDatabase} from "../../index"

// Instantiate helpers
const cryptoHelper = new CryptoHelper()
// Instantiate repositories
const authorizationCodeRepository = new PostgresAuthorizationTokenRepository(postgresDatabase)
const userRepository = new PostgresUserRepository(postgresDatabase)

// Instantiate Use Case
const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository, authorizationCodeRepository, cryptoHelper)

// Instantiate Controller
const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase)

export {authenticateUserController}
