import { getRepository } from "typeorm";
import { Module } from "../../entities/Modules";
import { IModuleRepository } from "../IModuleRepository";

export class ModuleRepostiroy implements IModuleRepository{
  async save(module: Module): Promise<Module> {
    return await getRepository(Module).save(module)
  }
  async update(module: Module): Promise<Module> {
    return await getRepository(Module).save(module)
  }

  async delete(module: Module): Promise<void> {
    await getRepository(Module).remove(module)
  }
  async all(): Promise<Module[]> {
    return await getRepository(Module).find();
  }
  async findById(id: string): Promise<Module | undefined> {
    
    return  await getRepository(Module).findOne({
      where: {id}
    });

  }

}