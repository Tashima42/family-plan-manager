import {CreateGroupPlanController} from "./create-group-plan-controller";
import {CreateGroupPlanUseCase} from "./create-group-plan-use-case";
import {SqliteDatabase} from "../../repositories/implementations/Sqlite/index";
import {SqliteGroupRepository} from "../../repositories/implementations/Sqlite/SqliteGroupPlanRepository";

// Instantiate repositories
const sqliteDatabase = new SqliteDatabase()
const groupRepository = new SqliteGroupRepository(sqliteDatabase)

// Instantiate Use Case
const createGroupPlanUseCase = new CreateGroupPlanUseCase(groupRepository)

// Instantiate Controller
const createGroupPlanController = new CreateGroupPlanController(createGroupPlanUseCase)

export {createGroupPlanController}
