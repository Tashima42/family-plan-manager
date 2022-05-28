import {GetUserPaymentsController} from "./get-user-payments-controller";
import {GetUserPaymentsUseCase} from "./get-user-payments-use-case";
import {postgresDatabase} from "../..";
import {PostgresPaymentRepository} from "../../repositories/implementations/Postgres/PostgresPaymentRepository";

// Instantiate repositories
const paymentRepository = new PostgresPaymentRepository(postgresDatabase)

// Instantiate Use Case
const getUserPaymentsUseCase = new GetUserPaymentsUseCase(paymentRepository)

// Instantiate Controller
const getUserPaymentsController = new GetUserPaymentsController(getUserPaymentsUseCase)

export {getUserPaymentsController}
