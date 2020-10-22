import { ModuleStatus } from "../../../../shared/Enun/moduleStatus";
import { AppError } from "../../../../shared/errors/AppError";
import { FakeModuleRepository } from "../../../../shared/fakes/FakeModuleRepository";
import { FakeUserRepository } from "../../../../shared/fakes/FakeUserRepository";
import { User } from "../../../userManagement/entities/User";
import { updateUserController } from "../../../userManagement/useCases/UpdateUser";
import { UpdateModuleUseCase } from "./UpdateModuleUseCase";

describe('Update Module', () => {
  it('Shoul be able to update a module', async () => {
    const moduleRepository = new FakeModuleRepository();
    const userRepository = new FakeUserRepository()
    const updateModuleUseCase = new UpdateModuleUseCase(moduleRepository);
    
    const user = new User({
      email: 'testUser@test.com',
      name: 'Teste User',
      password: 'testePassword'
    })

    await userRepository.save(user);

    const module = await moduleRepository.save({
      id: 'asdf',
      description: 'Test Description',
      name: 'Module Test1',
      user: user,
      status: ModuleStatus.ATIVO,
    })
    const updatedModule = await updateModuleUseCase.execute({
      description: module.description,
      name: 'Updated Module', 
      id: module.id || 'asdf',
      status: module.status || 'PENDENTE',
      user: {
        id: user.id || 'asdfasd'
      }
    })
    expect(updatedModule.name).toBe('Updated Module')
  })
  
  it('Shoul not be able to update a non existent module', async () => {
    const moduleRepository = new FakeModuleRepository();
    const userRepository = new FakeUserRepository()
    const updateModuleUseCase = new UpdateModuleUseCase(moduleRepository);
    
    const user = new User({
      email: 'testUser@test.com',
      name: 'Teste User',
      password: 'testePassword'
    })

    await userRepository.save(user);

    
    expect(updateModuleUseCase.execute({
      description: 'Modulo Test',
      name: 'Updated Module', 
      id: 'asdf',
      status: 'PENDENTE',
      user: {
        id: user.id || 'asdfasd'
      }
    })).rejects.toBeInstanceOf(AppError)
  })
  
  it('Shoul not be able to update a module that you do not own', async () => {
    const moduleRepository = new FakeModuleRepository();
    const userRepository = new FakeUserRepository()
    const updateModuleUseCase = new UpdateModuleUseCase(moduleRepository);
    
    const user = new User({
      email: 'testUser@test.com',
      name: 'Teste User',
      password: 'testePassword'
    })

    await userRepository.save(user);

    const module = await moduleRepository.save({
      id: 'asdf',
      description: 'Test Description',
      name: 'Module Test1',
      user: user,
      status: ModuleStatus.ATIVO,
    })
    
    expect(updateModuleUseCase.execute({
      description: 'Modulo Test',
      name: 'Updated Module', 
      id: 'asdf',
      status: 'PENDENTE',
      user: {
        id: 'asdfasd'
      }
    })).rejects.toBeInstanceOf(AppError)
  })

})