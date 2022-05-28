import {RegisterUserUseCase} from "./register-user-use-case";
import {RegisterUserController} from "./register-user-controller";
import {CryptoHelper} from "../../helpers/implementations/CryptoHelper";
import {postgresDatabase} from "../..";
import {PostgresUserRepository} from "../../repositories/implementations/Postgres/PostgresUserRepository";

// Instantiate helpers
const cryptoHelper = new CryptoHelper()
// Instantiate repositories
const userRepository = new PostgresUserRepository(postgresDatabase)

// Instantiate Use Case
const registerUserUseCase = new RegisterUserUseCase(userRepository, cryptoHelper)

// Instantiate Controller
const registerUserController = new RegisterUserController(registerUserUseCase)

export {registerUserController}
