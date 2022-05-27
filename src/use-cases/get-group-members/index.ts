import {GetGroupMembersController} from "./get-group-members-controller";
import {SqliteDatabase} from "../../repositories/implementations/Sqlite/index";
import {SqliteGroupRepository} from "../../repositories/implementations/Sqlite/SqliteGroupPlanRepository";
import {GetUserGroupPlansUseCase} from "./get-group-members-use-case";

// Instantiate repositories
const sqliteDatabase = new SqliteDatabase()
const groupRepository = new SqliteGroupRepository(sqliteDatabase)

// Instantiate Use Case
const getGroupMembersUseCase = new GetUserGroupPlansUseCase(groupRepository)

// Instantiate Controller
const getGroupMembersController = new GetGroupMembersController(getGroupMembersUseCase)

export {getGroupMembersController}
