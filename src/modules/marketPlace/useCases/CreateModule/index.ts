import { UserRepository } from "../../../userManagement/repositories/implementations/UserRepository";
import { ModuleRepostiroy } from "../../repositories/implementation/ModuleRepository";
import { CreateModuleController } from "./CreateModuleController";
import { CreateModuleUseCase } from "./CreateModuleUseCase";

const moduleRepository = new ModuleRepostiroy();
const userRepository = new UserRepository()
const createModuleUseCase = new CreateModuleUseCase(moduleRepository, userRepository);
const createModuleController = new CreateModuleController(createModuleUseCase);


export { createModuleController, createModuleUseCase }