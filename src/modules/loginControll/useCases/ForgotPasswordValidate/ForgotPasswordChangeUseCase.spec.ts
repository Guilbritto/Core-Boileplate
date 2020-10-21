import { FakeHashProvider } from "../../../../shared/fakes/FakeHashProvider"
import { FakeMailProvider } from "../../../../shared/fakes/FakeMailProvider"
import { FakeUserRepository } from "../../../../shared/fakes/FakeUserRepository"
import { CreateUserUseCase } from "../../../userManagement/useCases/CreateUser/CreateUserUseCase"
import AppError from "../../../../shared/errors/AppError";
import { ForgotPasswordValidateUseCase } from "./ForgotPasswordValidateUseCase"
import { ForgotPasswordUseCase } from "../ForgotPassword/ForgotPasswordUseCase";

describe('Forgot Password Validate', () => {
  it('Should be able to validate user code', async () => {
    const fakeMailProvider = new FakeMailProvider()
    const fakeUserRepository= new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()
    const fakeUserUseCase = new CreateUserUseCase(fakeUserRepository, fakeMailProvider, fakeHashProvider);
    const forgotPasswordValidate = new ForgotPasswordValidateUseCase(fakeUserRepository)
    const forgotPassword = new ForgotPasswordUseCase(fakeUserRepository, fakeMailProvider)
    
    await fakeUserUseCase.execute({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '1234',
    });

    await forgotPassword.execute('teste@gmail.com');

    const user = await fakeUserRepository.findByEmail('teste@gmail.com')

    const validate = await forgotPasswordValidate.execute(user?.email || '', user?.forgot_code || '')

    expect(validate).toBe(true)
  })

  it('Should not be able to validate user code with a wrong code', async () => {
    const fakeMailProvider = new FakeMailProvider()
    const fakeUserRepository= new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()
    const fakeUserUseCase = new CreateUserUseCase(fakeUserRepository, fakeMailProvider, fakeHashProvider);
    const forgotPasswordValidate = new ForgotPasswordValidateUseCase(fakeUserRepository)
    const forgotPassword = new ForgotPasswordUseCase(fakeUserRepository, fakeMailProvider)
    
    await fakeUserUseCase.execute({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '1234',
    });

    await forgotPassword.execute('teste@gmail.com');

    const user = await fakeUserRepository.findByEmail('teste@gmail.com')

    expect(forgotPasswordValidate.execute(user?.email || '', 'asdfasdfasdfasdf')).rejects.toBeInstanceOf(AppError)
  })
})