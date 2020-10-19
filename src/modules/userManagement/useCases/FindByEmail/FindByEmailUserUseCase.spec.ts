import { FakeUserRepository } from "../../../../shared/fakes/FakeUserRepository";
import { FindByEmailUserUseCase } from "./FindByEmailUserUseCase";
import AppError from "../../../../shared/errors/AppError";

describe('FindByEmail', () => {
  it('Should be able to get user by email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const findByemailUsecase = new FindByEmailUserUseCase(fakeUserRepository);
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
    const user = await findByemailUsecase.execute('teste2@gmail.com');
    expect(user).toHaveProperty('name');
    expect(user?.name).toBe('Teste 2');    
  })

  it('Should not be able to get user by email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const findByemailUsecase = new FindByEmailUserUseCase(fakeUserRepository);
    
    expect(findByemailUsecase.execute('teste2@gmail.com')).rejects.toBeInstanceOf(AppError);
  })
})