import {GetUserGroupsPlansController} from "./get-user-groups-plans-controller";
import {GetUserGroupPlansUseCase} from "./get-user-groups-plans-use-case";
import {postgresDatabase} from "../..";
import {PostgresGroupRepository} from "../../repositories/implementations/Postgres/PostgresGroupPlanRepository";

// Instantiate repositories
const groupRepository = new PostgresGroupRepository(postgresDatabase)

// Instantiate Use Case
const getUserGroupsPlansUseCase = new GetUserGroupPlansUseCase(groupRepository)

// Instantiate Controller
const getUserGroupsPlansController = new GetUserGroupsPlansController(getUserGroupsPlansUseCase)

export {getUserGroupsPlansController}
