import { ModuleStatus } from "../../../../shared/Enun/moduleStatus";
import { FakeModuleRepository } from "../../../../shared/fakes/FakeModuleRepository";
import { FakeUserRepository } from "../../../../shared/fakes/FakeUserRepository";
import { User } from "../../../userManagement/entities/User";
import { CreateModuleUseCase } from "./CreateModuleUseCase";
import AppError from '../../../../shared/errors/AppError';


describe('Create Module', () => {
  it('Should be able to create a new module', async () => {
    const moduleRepository = new FakeModuleRepository();
    const userRepository = new FakeUserRepository()
    const createModuleUseCase = new CreateModuleUseCase(moduleRepository, userRepository);

    const user = new User({
      email: 'testUser@test.com',
      name: 'Teste User',
      password: 'testePassword'
    })

    userRepository.save(user);

    const module = await createModuleUseCase.execute({
      description: 'Test Description',
      name: 'Module Test1',
      owner: user.id || 'asdasd',
      status: ModuleStatus.ATIVO,
    })

    expect(module).toHaveProperty('user')
    expect(module.user).toHaveProperty('id')
  })

  it('Should not be able to create a new module with the same name as another one', async () => {
    const moduleRepository = new FakeModuleRepository();
    const userRepository = new FakeUserRepository()
    const createModuleUseCase = new CreateModuleUseCase(moduleRepository, userRepository);

    const user = new User({
      email: 'testUser@test.com',
      name: 'Teste User',
      password: 'testePassword'
    })

    await userRepository.save(user);

    expect(createModuleUseCase.execute({
      description: 'Test Description',
      name: 'Module Test',
      owner: user.id || 'asdasd',
      status: ModuleStatus.ATIVO,
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create a new module with non existing user', async () => {
    const moduleRepository = new FakeModuleRepository();
    const userRepository = new FakeUserRepository()
    const createModuleUseCase = new CreateModuleUseCase(moduleRepository, userRepository);


    expect(createModuleUseCase.execute({
      description: 'Test Description',
      name: 'Module Test',
      owner: 'asdasd',
      status: ModuleStatus.ATIVO,
    })).rejects.toBeInstanceOf(AppError)
  })
  
})