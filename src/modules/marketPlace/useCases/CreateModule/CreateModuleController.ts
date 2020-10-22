import { Request, Response } from "express";
import { CreateModuleUseCase } from "./CreateModuleUseCase";

export class CreateModuleController {

  constructor(private createModuleUseCase: CreateModuleUseCase
    ){}

  async handle(request: Request, response: Response){

    const { id } = request.user
    const { name, description, status} = request.body;

    await this.createModuleUseCase.execute({ 
      description,
      name,
      owner: id,
      status
    })

    response.status(201).send();
  }
}