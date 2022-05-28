import {CreateGroupPlanController} from "./create-group-plan-controller";
import {CreateGroupPlanUseCase} from "./create-group-plan-use-case";
import {postgresDatabase} from "../..";
import {PostgresGroupRepository} from "../../repositories/implementations/Postgres/PostgresGroupPlanRepository";

// Instantiate repositories
const groupRepository = new PostgresGroupRepository(postgresDatabase)

// Instantiate Use Case
const createGroupPlanUseCase = new CreateGroupPlanUseCase(groupRepository)

// Instantiate Controller
const createGroupPlanController = new CreateGroupPlanController(createGroupPlanUseCase)

export {createGroupPlanController}
