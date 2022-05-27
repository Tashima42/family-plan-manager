import {RegisterUserUseCase} from "./register-user-use-case";
import {RegisterUserController} from "./register-user-controller";
import {CryptoHelper} from "../../helpers/implementations/CryptoHelper";
import {SqliteUserRepository} from "../../repositories/implementations/Sqlite/SqliteUserRepository";
import {SqliteDatabase} from "../../repositories/implementations/Sqlite/index";

// Instantiate helpers
const cryptoHelper = new CryptoHelper()
// Instantiate repositories
const sqliteDatabase = new SqliteDatabase()
const userRepository = new SqliteUserRepository(sqliteDatabase)

// Instantiate Use Case
const registerUserUseCase = new RegisterUserUseCase(userRepository, cryptoHelper)

// Instantiate Controller
const registerUserController = new RegisterUserController(registerUserUseCase)

export {registerUserController}
