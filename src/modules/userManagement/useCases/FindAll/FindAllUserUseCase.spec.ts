import { FakeUserRepository } from "../../../../shared/fakes/FakeUserRepository";
import { FindAllUserUseCase } from "./FindAllUserUseCase";

describe('FindAll', () => {
  it('Should be able to get all users', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const findAllUserUseCase = new FindAllUserUseCase(fakeUserRepository);
    await fakeUserRepository.save({
      "name":"Teste",
      "email":"teste@gmail.com",
      "password":"teste"
    }
    )
    await fakeUserRepository.save({
      "name":"Teste 2",
      "email":"teste2@gmail.com",
      "password":"teste2"
    }
    )
    const users = await findAllUserUseCase.execute();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length === 2).toBe(true);
    
  })
})