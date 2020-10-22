import { FakeUserRepository } from "../../../../shared/fakes/FakeUserRepository";
import AppError from "../../../../shared/errors/AppError";
import { RemoveUserUseCase } from "./RemoveUserUseCase";

describe('FindByEmail', () => {
  it('Should be able to remove user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const removeUserUseCase = new RemoveUserUseCase(fakeUserRepository);
    await fakeUserRepository.save({
      'id': 'asdf168121',
      "name":"Teste",
      "email":"teste@gmail.com",
      "password":"teste"
    })
    await fakeUserRepository.save({
      'id': 'jhfalkjhdl',
      "name":"Teste 2",
      "email":"teste2@gmail.com",
      "password":"teste2"
    })

    await removeUserUseCase.execute('jhfalkjhdl')

    const users = await fakeUserRepository.all();

    expect(users.length === 1).toBe(true);
    expect(users[0]?.name).toBe('Teste');    
  })

  it('Should not be able to remove user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const removeUserUseCase = new RemoveUserUseCase(fakeUserRepository);
    
    expect(removeUserUseCase.execute('jhfalkjhdl')).rejects.toBeInstanceOf(AppError);
  })
})