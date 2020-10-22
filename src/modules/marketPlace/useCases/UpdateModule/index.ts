import { ModuleRepostiroy } from "../../repositories/implementation/ModuleRepository";
import { UpdateModuleController } from "./UpdateModuleController";
import { UpdateModuleUseCase } from "./UpdateModuleUseCase";

const moduleRepository = new ModuleRepostiroy()
const updateModuleUseCase = new UpdateModuleUseCase(moduleRepository)
const updateModuleController = new UpdateModuleController(updateModuleUseCase)

export { updateModuleController, updateModuleUseCase}