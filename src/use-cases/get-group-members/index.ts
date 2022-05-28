import {GetGroupMembersController} from "./get-group-members-controller";
import {GetUserGroupPlansUseCase} from "./get-group-members-use-case";
import {postgresDatabase} from "../..";
import { PostgresGroupRepository } from "../../repositories/implementations/Postgres/PostgresGroupPlanRepository";

// Instantiate repositories
const groupRepository = new PostgresGroupRepository(postgresDatabase)

// Instantiate Use Case
const getGroupMembersUseCase = new GetUserGroupPlansUseCase(groupRepository)

// Instantiate Controller
const getGroupMembersController = new GetGroupMembersController(getGroupMembersUseCase)

export {getGroupMembersController}
