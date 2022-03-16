import {AuthenticateUserUseCase} from "./authenticate-user-use-case";
import {AuthenticateUserController} from "./authenticate-user-controller";
import {CryptoHelper} from "../../helpers/implementations/CryptoHelper";
import {SqliteAuthorizationTokenRepository} from "../../repositories/implementations/Sqlite/SqliteAuthorizationTokenRepository";
import {SqliteUserRepository} from "../../repositories/implementations/Sqlite/SqliteUserRepository";
import {SqliteDatabase} from "../../repositories/implementations/Sqlite/index";

// Instantiate helpers
const cryptoHelper = new CryptoHelper()
// Instantiate repositories
const sqliteDatabase = new SqliteDatabase()
const authorizationCodeRepository = new SqliteAuthorizationTokenRepository(sqliteDatabase)
const userRepository = new SqliteUserRepository(sqliteDatabase)

// Instantiate Use Case
const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository, authorizationCodeRepository, cryptoHelper)

// Instantiate Controller
const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase)

export {authenticateUserController}
