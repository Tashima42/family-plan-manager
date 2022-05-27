import {MakePaymentController} from "./make-payment-controller";
import {MakePaymentUseCase} from "./make-payment-use-case";
import {SqliteDatabase} from "../../repositories/implementations/Sqlite/index";
import {SqliteGroupRepository} from "../../repositories/implementations/Sqlite/SqliteGroupPlanRepository";
import {SqliteUserRepository} from "../../repositories/implementations/Sqlite/SqliteUserRepository";
import {SqlitePaymentRepository} from "../../repositories/implementations/Sqlite/SqlitePaymentRepository";

// Instantiate repositories
const sqliteDatabase = new SqliteDatabase()
const groupRepository = new SqliteGroupRepository(sqliteDatabase)
const userRepository = new SqliteUserRepository(sqliteDatabase)
const paymentRepository = new SqlitePaymentRepository(sqliteDatabase)

// Instantiate Use Case
const makePaymentUseCase = new MakePaymentUseCase(paymentRepository, groupRepository, userRepository)

// Instantiate Controller
const makePaymentController = new MakePaymentController(makePaymentUseCase)

export {makePaymentController}
