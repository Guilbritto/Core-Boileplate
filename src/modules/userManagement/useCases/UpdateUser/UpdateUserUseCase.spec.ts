import { FakeUserRepository } from "../../../../shared/fakes/FakeUserRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { UpdateUserUseCase } from "./UpdateUserUseCase";
import { UserStatus } from "../../../../shared/Enun/userStatus";

describe('Update', () => {
  it('Should be able to update an user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const updateUserUseCase = new UpdateUserUseCase(fakeUserRepository);
    
    await fakeUserRepository.save({
      'id': 'asdf168121',
      "name":"Teste",
      "email":"teste@gmail.com",
      "password":"teste"
    }
    )
    

    await updateUserUseCase.execute({
      email: 'testeUpdated@gmail.com',
      id: 'asdf168121',
      name: 'Teste Updated',
      password: 'teste',
      status: UserStatus.ATIVO
    })

    const user = await fakeUserRepository.findById('asdf168121');

    expect(user?.status).toBe(UserStatus.ATIVO);
    expect(user?.name).toBe('Teste Updated');    
  })

  it('Should not be able to update an user with same email it other', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const updateUserUseCase = new UpdateUserUseCase(fakeUserRepository);
    
    await fakeUserRepository.save({
      'id': 'asdf168121',
      "name":"Teste",
      "email":"teste@gmail.com",
      "password":"teste"
    }
    )
    await fakeUserRepository.save({
      'id': 'asdf1681221',
      "name":"Teste2",
      "email":"teste2@gmail.com",
      "password":"teste2"
    }
    )
    


    

    expect(updateUserUseCase.execute({
      email: 'teste2@gmail.com',
      id: 'asdf168121',
      name: 'Teste Updated',
      password: 'teste',
      status: UserStatus.ATIVO
    })).rejects.toBeInstanceOf(AppError);
  })
  it('should not be able to update a nonexistent user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const updateUserUseCase = new UpdateUserUseCase(fakeUserRepository);
    
    
    expect(updateUserUseCase.execute({
      email: 'teste2@gmail.com',
      id: 'asdf168121',
      name: 'Teste Updated',
      password: 'teste',
      status: UserStatus.ATIVO
    })).rejects.toBeInstanceOf(AppError);
  })
})