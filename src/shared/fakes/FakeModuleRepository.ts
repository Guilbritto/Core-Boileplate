import { Module } from "../../modules/marketPlace/entities/Modules";
import { IModuleRepository } from "../../modules/marketPlace/repositories/IModuleRepository";

export class FakeModuleRepository implements IModuleRepository {  
  private modules: Module[] = [];

  async save(module: Module): Promise<Module> {
    this.modules.push(module);
    return module
  }

  async update(module: Module): Promise<Module> {
    const mod = this.modules.find(m => m.id === module.id);
    return mod || {} as Module;
  }

  async delete(module: Module): Promise<void> {
    const index = this.modules.findIndex(m => m.id === module.id)
    this.modules.splice(index,1 );
  }

  async all(): Promise<Module[]> {
    return this.modules;
  }

  async findById(id: string): Promise<Module | undefined> {
    return this.modules.find(m => m.id === id);
  }
}
