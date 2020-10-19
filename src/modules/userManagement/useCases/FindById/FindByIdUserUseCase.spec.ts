import { FakeUserRepository } from "../../../../shared/fakes/FakeUserRepository";
import AppError from "../../../../shared/errors/AppError";
import { FindByIdUserUseCase } from "./FindByIdUserUseCase";

describe('FindByEmail', () => {
  it('Should be able to get user by id', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const findByidUsecase = new FindByIdUserUseCase(fakeUserRepository);
    await fakeUserRepository.save({
      'id': 'asdf168121',
      "name":"Teste",
      "email":"teste@gmail.com",
      "password":"teste"
    }
    )
    await fakeUserRepository.save({
      'id': 'jhfalkjhdl',
      "name":"Teste 2",
      "email":"teste2@gmail.com",
      "password":"teste2"
    }
    )
    const user = await findByidUsecase.execute('jhfalkjhdl');
    expect(user).toHaveProperty('name');
    expect(user?.name).toBe('Teste 2');    
  })

  it('Should not be able to get user by id', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const findByidUsecase = new FindByIdUserUseCase(fakeUserRepository);
    
    expect(findByidUsecase.execute('jhfalkjhdl')).rejects.toBeInstanceOf(AppError);
  })
})