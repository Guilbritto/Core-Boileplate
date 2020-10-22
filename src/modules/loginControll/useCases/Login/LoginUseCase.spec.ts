import { FakeHashProvider } from "../../../../shared/fakes/FakeHashProvider"
import { FakeMailProvider } from "../../../../shared/fakes/FakeMailProvider"
import { FakeUserRepository } from "../../../../shared/fakes/FakeUserRepository"
import { JWTTokenProvider } from "../../../security/implementations/TokenProvider/JWTTokenProvider"
import { CreateUserUseCase } from "../../../userManagement/useCases/CreateUser/CreateUserUseCase"
import { LoginUseCase } from "./LoginUseCase"
import { AppError } from "../../../../shared/errors/AppError";
describe('Login', () => {
  it('Should be able to login', async () => {
    const fakeMailProvider = new FakeMailProvider()
    const fakeUserRepository= new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()
    const fakeUserUseCase = new CreateUserUseCase(fakeUserRepository, fakeMailProvider, fakeHashProvider);
    const tokenProvider = new JWTTokenProvider()
    await fakeUserUseCase.execute({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '1234',
    });
    const loginUseCase = new LoginUseCase(fakeUserRepository, tokenProvider, fakeHashProvider)
    
    const user = await loginUseCase.execute({
      email: 'teste@gmail.com',
      password: '1234'
    });

    expect(user).toHaveProperty('token');
  })
  it('Should not be able to login with a non existing user', async () => {
    const fakeUserRepository= new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()
    const tokenProvider = new JWTTokenProvider()
    const loginUseCase = new LoginUseCase(fakeUserRepository, tokenProvider, fakeHashProvider)
    

    expect(loginUseCase.execute({
      email: 'teste@gmail.com',
      password: '1234'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to login with wrong password', async () => {
    const fakeMailProvider = new FakeMailProvider()
    const fakeUserRepository= new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()
    const fakeUserUseCase = new CreateUserUseCase(fakeUserRepository, fakeMailProvider, fakeHashProvider);
    const tokenProvider = new JWTTokenProvider()
    await fakeUserUseCase.execute({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '1234',
    });
    const loginUseCase = new LoginUseCase(fakeUserRepository, tokenProvider, fakeHashProvider)
    

    expect(loginUseCase.execute({
      email: 'teste@gmail.com',
      password: '11111'
    })).rejects.toBeInstanceOf(AppError);
  })
})