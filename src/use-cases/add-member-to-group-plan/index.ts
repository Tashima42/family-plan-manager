import {AddMemberToGroupPlanController} from "./add-member-to-group-plan-controller";
import {AddMemberToGroupPlanUseCase} from "./add-member-to-group-plan-use-case";
import {SqliteDatabase} from "../../repositories/implementations/Sqlite/index";
import {SqliteGroupRepository} from "../../repositories/implementations/Sqlite/SqliteGroupPlanRepository";
import {SqliteUserRepository} from "../../repositories/implementations/Sqlite/SqliteUserRepository";

// Instantiate repositories
const sqliteDatabase = new SqliteDatabase()
const groupRepository = new SqliteGroupRepository(sqliteDatabase)
const userRepository = new SqliteUserRepository(sqliteDatabase)

// Instantiate Use Case
const addMemberToGroupPlanUseCase = new AddMemberToGroupPlanUseCase(groupRepository, userRepository)

// Instantiate Controller
const addMemberToGroupPlanController = new AddMemberToGroupPlanController(addMemberToGroupPlanUseCase)

export {addMemberToGroupPlanController}
