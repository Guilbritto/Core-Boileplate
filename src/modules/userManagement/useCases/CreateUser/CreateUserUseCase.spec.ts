import { FakeHashProvider } from "../../../../shared/fakes/FakeHashProvider";
import { FakeMailProvider } from "../../../../shared/fakes/FakeMailProvider";
import { FakeUserRepository } from "../../../../shared/fakes/FakeUserRepository";
import AppError from "../../../../shared/errors/AppError";
import { CreateUserUseCase } from "./CreateUserUseCase";

describe('CreateUser', () => {
  it('Should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();
    const fakeHashProvider = new FakeHashProvider();
    const createUserUseCase = new CreateUserUseCase(fakeUserRepository, fakeMailProvider,fakeHashProvider);
      const user = await createUserUseCase.execute({
        name: 'Test',
        email: 'teste@teste.com',
        password: 'test123',
      });
      expect(user).toHaveProperty('email');
      expect(user.email).toBe('teste@teste.com')
  })

  it('Should not be able to create a new user with same email it other', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();
    const fakeHashProvider = new FakeHashProvider();
    const createUserUseCase = new CreateUserUseCase(fakeUserRepository, fakeMailProvider,fakeHashProvider);
      const user = await createUserUseCase.execute({
        name: 'Test',
        email: 'teste@teste.com',
        password: 'test123',
      });

      expect(createUserUseCase.execute({
        name: 'Test',
        email: 'teste@teste.com',
        password: 'test123',
      })).rejects.toBeInstanceOf(AppError)
  })


  

})