import {MakePaymentController} from "./make-payment-controller";
import {MakePaymentUseCase} from "./make-payment-use-case";
import {SqliteDatabase} from "../../repositories/implementations/Sqlite/index";
import {SqliteGroupRepository} from "../../repositories/implementations/Sqlite/SqliteGroupPlanRepository";
import {SqlitePaymentRepository} from "../../repositories/implementations/Sqlite/SqlitePaymentRepository";

// Instantiate repositories
const sqliteDatabase = new SqliteDatabase()
const groupRepository = new SqliteGroupRepository(sqliteDatabase)
const paymentRepository = new SqlitePaymentRepository(sqliteDatabase)

// Instantiate Use Case
const makePaymentUseCase = new MakePaymentUseCase(paymentRepository, groupRepository)

// Instantiate Controller
const makePaymentController = new MakePaymentController(makePaymentUseCase)

export {makePaymentController}
