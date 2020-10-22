import { FakeHashProvider } from "../../../../shared/fakes/FakeHashProvider"
import { FakeMailProvider } from "../../../../shared/fakes/FakeMailProvider"
import { FakeUserRepository } from "../../../../shared/fakes/FakeUserRepository"
import { CreateUserUseCase } from "../../../userManagement/useCases/CreateUser/CreateUserUseCase"
import { AppError } from "../../../../shared/errors/AppError";
import { ForgotPasswordChangeUseCase } from "./ForgotPasswordChangeUseCase"
import { ForgotPasswordUseCase } from "../ForgotPassword/ForgotPasswordUseCase";



describe('Forgot Password Change', () => {
  it('Should be able to Change Password', async () => {
    const fakeMailProvider = new FakeMailProvider()
    const fakeUserRepository= new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()
    const fakeUserUseCase = new CreateUserUseCase(fakeUserRepository, fakeMailProvider, fakeHashProvider);
    const forgotPasswordChange = new ForgotPasswordChangeUseCase(fakeUserRepository, fakeHashProvider)
    const forgotPassword = new ForgotPasswordUseCase(fakeUserRepository, fakeMailProvider)
    await fakeUserUseCase.execute({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '1234',
    });

    await forgotPassword.execute('teste@gmail.com');

    const user = await fakeUserRepository.findByEmail('teste@gmail.com')

    await forgotPasswordChange.execute({
      code: user?.forgot_code || '',
      email: user?.email || '',
      password: 'Padrao998'
    })

    const userAfterChange = await fakeUserRepository.findByEmail('teste@gmail.com')

    expect(userAfterChange?.password).toBe('Padrao998')
  })
  it('Should not be able to Change Password with wrong forgot code', async () => {
    const fakeMailProvider = new FakeMailProvider()
    const fakeUserRepository= new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()
    const fakeUserUseCase = new CreateUserUseCase(fakeUserRepository, fakeMailProvider, fakeHashProvider);
    const forgotPasswordChange = new ForgotPasswordChangeUseCase(fakeUserRepository, fakeHashProvider)
    const forgotPassword = new ForgotPasswordUseCase(fakeUserRepository, fakeMailProvider)
    await fakeUserUseCase.execute({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '1234',
    });

    await forgotPassword.execute('teste@gmail.com');

    const user = await fakeUserRepository.findByEmail('teste@gmail.com')

    expect(forgotPasswordChange.execute({
      code: 'asdfqargasd',
      email: user?.email || '',
      password: 'Padrao998'
    })).rejects.toBeInstanceOf(AppError)
  })
})