import {AddMemberToGroupPlanController} from "./add-member-to-group-plan-controller";
import {AddMemberToGroupPlanUseCase} from "./add-member-to-group-plan-use-case";
import {postgresDatabase} from "../..";
import {PostgresGroupRepository} from "../../repositories/implementations/Postgres/PostgresGroupPlanRepository";
import {PostgresUserRepository} from "../../repositories/implementations/Postgres/PostgresUserRepository";

// Instantiate repositories
const groupRepository = new PostgresGroupRepository(postgresDatabase)
const userRepository = new PostgresUserRepository(postgresDatabase)

// Instantiate Use Case
const addMemberToGroupPlanUseCase = new AddMemberToGroupPlanUseCase(groupRepository, userRepository)

// Instantiate Controller
const addMemberToGroupPlanController = new AddMemberToGroupPlanController(addMemberToGroupPlanUseCase)

export {addMemberToGroupPlanController}
