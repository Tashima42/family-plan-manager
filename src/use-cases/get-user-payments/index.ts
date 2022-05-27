import {GetUserPaymentsController} from "./get-user-payments-controller";
import {SqliteDatabase} from "../../repositories/implementations/Sqlite/index";
import {SqlitePaymentRepository} from "../../repositories/implementations/Sqlite/SqlitePaymentRepository";
import {GetUserPaymentsUseCase} from "./get-user-payments-use-case";

// Instantiate repositories
const sqliteDatabase = new SqliteDatabase()
const paymentRepository = new SqlitePaymentRepository(sqliteDatabase)

// Instantiate Use Case
const getUserPaymentsUseCase = new GetUserPaymentsUseCase(paymentRepository)

// Instantiate Controller
const getUserPaymentsController = new GetUserPaymentsController(getUserPaymentsUseCase)

export {getUserPaymentsController}
