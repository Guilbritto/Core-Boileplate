import { IUsersRepository } from '../../../userManagement/repositories/IUsersRepository';
import {IModuleRepository} from '../../repositories/IModuleRepository'
import { ICreateModuleRequest } from './CreateModuleDTO';
import AppError from '../../../../shared/errors/AppError'
import { Module } from '../../entities/Modules';


export class CreateModuleUseCase {

  constructor(
    private moduleRepository: IModuleRepository,
    private userRepository: IUsersRepository,
  ){ }

  async execute(data: ICreateModuleRequest){

    const {name, status, description, owner } = data;

    const user = await this.userRepository.findById(owner);
    
    if (!user){
      throw new AppError('User not found!')
    }

    const modules = await this.userRepository.getModules(user.id || '')

    if(modules.find(m => m.name.toLocaleLowerCase() === name.toLocaleLowerCase())){
      throw new AppError('You cannot create two modules with same name');
    }

    const module = new Module({
      description,
      name,
      user,
      status,
    })

    return await this.moduleRepository.save(module);
  }
}