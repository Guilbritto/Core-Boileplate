import { Request, Response } from "express";
import { UpdateModuleUseCase } from "./UpdateModuleUseCase";

export class UpdateModuleController{

  constructor(private updateModuleUseCase: UpdateModuleUseCase){}

  async handle(request: Request, response: Response){

    const { id, description, name, status } = request.body;

    const module = await this.updateModuleUseCase.execute({
      description,
      id,
      name,
      status,
      user: {
        id: request.user.id
      }
    })
    
    response.status(200).json(module);
  }
}