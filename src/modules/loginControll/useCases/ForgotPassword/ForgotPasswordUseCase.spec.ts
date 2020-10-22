import { FakeHashProvider } from "../../../../shared/fakes/FakeHashProvider"
import { FakeMailProvider } from "../../../../shared/fakes/FakeMailProvider"
import { FakeUserRepository } from "../../../../shared/fakes/FakeUserRepository"
import { CreateUserUseCase } from "../../../userManagement/useCases/CreateUser/CreateUserUseCase"
import AppError from "../../../../shared/errors/AppError";
import { ForgotPasswordUseCase } from "./ForgotPasswordUseCase"



describe('Forgot Password', () => {
  it('Should be able to Send the forgot code to user', async () => {
    const fakeMailProvider = new FakeMailProvider()
    const fakeUserRepository= new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()
    const fakeUserUseCase = new CreateUserUseCase(fakeUserRepository, fakeMailProvider, fakeHashProvider);
    const forgotPassword = new ForgotPasswordUseCase(fakeUserRepository, fakeMailProvider)

    await fakeUserUseCase.execute({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '1234',
    });

    await forgotPassword.execute('teste@gmail.com');

    const user = await fakeUserRepository.findByEmail('teste@gmail.com')

    expect(user).toHaveProperty('forgot_code');
  })

  it('Should not be able to Send the forgot code to user with a non existing email', async () => {
    const fakeMailProvider = new FakeMailProvider()
    const fakeUserRepository= new FakeUserRepository()
    const forgotPassword = new ForgotPasswordUseCase(fakeUserRepository, fakeMailProvider)

    expect(forgotPassword.execute('teste@gmail.com')).rejects.toBeInstanceOf(AppError);
  })
})