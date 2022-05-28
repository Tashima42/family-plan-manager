import {MakePaymentController} from "./make-payment-controller";
import {MakePaymentUseCase} from "./make-payment-use-case";
import {ImageBB} from "../../helpers/implementations/ImageBB";
import {postgresDatabase} from "../..";
import {PostgresPaymentRepository} from "../../repositories/implementations/Postgres/PostgresPaymentRepository";
import {PostgresGroupRepository} from "../../repositories/implementations/Postgres/PostgresGroupPlanRepository";

// Instantiate repositories
const groupRepository = new PostgresGroupRepository(postgresDatabase)
const paymentRepository = new PostgresPaymentRepository(postgresDatabase)
const imageBB = new ImageBB(process.env.IMAGE_BB_APIKEY)

// Instantiate Use Case
const makePaymentUseCase = new MakePaymentUseCase(paymentRepository, groupRepository, imageBB)

// Instantiate Controller
const makePaymentController = new MakePaymentController(makePaymentUseCase)

export {makePaymentController}
