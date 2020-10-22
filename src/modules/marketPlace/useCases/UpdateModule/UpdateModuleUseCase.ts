import { AppError } from "../../../../shared/errors/AppError";
import { IModuleRepository } from "../../repositories/IModuleRepository";
import { IUpdateModuleRequest } from "./UpdateModuleDTO";

export class UpdateModuleUseCase{

  constructor(private moduleRepository: IModuleRepository){}

  async execute(data: IUpdateModuleRequest ){

    const module = await this.moduleRepository.findById(data.id);
    
    if(!module){
      throw new AppError('Module not found!')
    }

    if(module.user.id !== data.user.id){
      throw new AppError('You cannot update a module that you do not own')
    }

    Object.assign(module, data)

    const updatedModule = await this.moduleRepository.update(module);
  
    return updatedModule;
  }
}