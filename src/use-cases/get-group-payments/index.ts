import {GetGroupPaymentsController} from "./get-group-payments-controller";
import {SqliteDatabase} from "../../repositories/implementations/Sqlite/index";
import {SqlitePaymentRepository} from "../../repositories/implementations/Sqlite/SqlitePaymentRepository";
import {GetGroupPaymentsUseCase} from "./get-group-payments-use-case";
import {SqliteGroupRepository} from "../../repositories/implementations/Sqlite/SqliteGroupPlanRepository";

// Instantiate repositories
const sqliteDatabase = new SqliteDatabase()
const paymentRepository = new SqlitePaymentRepository(sqliteDatabase)
const groupPlanRepository = new SqliteGroupRepository(sqliteDatabase)

// Instantiate Use Case
const getGroupPaymentsUseCase = new GetGroupPaymentsUseCase(paymentRepository, groupPlanRepository)

// Instantiate Controller
const getGroupPaymentsController = new GetGroupPaymentsController(getGroupPaymentsUseCase)

export {getGroupPaymentsController}
