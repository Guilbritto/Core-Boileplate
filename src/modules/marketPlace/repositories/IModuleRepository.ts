import { User } from "../../userManagement/entities/User";
import { Module } from "../entities/Modules";

export interface IModuleRepository{
  save(module:Module):Promise<Module>
  update(module: Module): Promise<Module>;
  delete(module: Module): Promise<void>;
  all(): Promise<Module[]>;
  findById(id:string):Promise<Module | undefined >
}