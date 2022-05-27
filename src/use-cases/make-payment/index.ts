import {MakePaymentController} from "./make-payment-controller";
import {MakePaymentUseCase} from "./make-payment-use-case";
import {SqliteDatabase} from "../../repositories/implementations/Sqlite/index";
import {SqliteGroupRepository} from "../../repositories/implementations/Sqlite/SqliteGroupPlanRepository";
import {SqlitePaymentRepository} from "../../repositories/implementations/Sqlite/SqlitePaymentRepository";
import {ImageBB} from "../../helpers/implementations/ImageBB";

// Instantiate repositories
const sqliteDatabase = new SqliteDatabase()
const groupRepository = new SqliteGroupRepository(sqliteDatabase)
const paymentRepository = new SqlitePaymentRepository(sqliteDatabase)
const imageBB = new ImageBB(process.env.IMAGE_BB_APIKEY)

// Instantiate Use Case
const makePaymentUseCase = new MakePaymentUseCase(paymentRepository, groupRepository, imageBB)

// Instantiate Controller
const makePaymentController = new MakePaymentController(makePaymentUseCase)

export {makePaymentController}
