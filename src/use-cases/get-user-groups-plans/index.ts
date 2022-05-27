import {GetUserGroupsPlansController} from "./get-user-groups-plans-controller";
import {SqliteDatabase} from "../../repositories/implementations/Sqlite/index";
import {SqliteGroupRepository} from "../../repositories/implementations/Sqlite/SqliteGroupPlanRepository";
import {GetUserGroupPlansUseCase} from "./get-user-groups-plans-use-case";

// Instantiate repositories
const sqliteDatabase = new SqliteDatabase()
const groupRepository = new SqliteGroupRepository(sqliteDatabase)

// Instantiate Use Case
const getUserGroupsPlansUseCase = new GetUserGroupPlansUseCase(groupRepository)

// Instantiate Controller
const getUserGroupsPlansController = new GetUserGroupsPlansController(getUserGroupsPlansUseCase)

export {getUserGroupsPlansController}
