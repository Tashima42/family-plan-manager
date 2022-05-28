import {GetGroupPaymentsController} from "./get-group-payments-controller";
import {GetGroupPaymentsUseCase} from "./get-group-payments-use-case";
import {postgresDatabase} from "../..";
import {PostgresPaymentRepository} from "../../repositories/implementations/Postgres/PostgresPaymentRepository";
import {PostgresGroupRepository} from "../../repositories/implementations/Postgres/PostgresGroupPlanRepository";

// Instantiate repositories
const paymentRepository = new PostgresPaymentRepository(postgresDatabase)
const groupPlanRepository = new PostgresGroupRepository(postgresDatabase)

// Instantiate Use Case
const getGroupPaymentsUseCase = new GetGroupPaymentsUseCase(paymentRepository, groupPlanRepository)

// Instantiate Controller
const getGroupPaymentsController = new GetGroupPaymentsController(getGroupPaymentsUseCase)

export {getGroupPaymentsController}
