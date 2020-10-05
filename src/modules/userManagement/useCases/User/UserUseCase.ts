import { User } from "../../../../database/entities/User";
import { IMailProvider } from "../../../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUserRequestDTO } from "./UserDTO";

export class UserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: IUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );
    console.log(userAlreadyExists);
    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const user = new User(data);

    this.usersRepository.save(user);

    this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "Pzm",
        email: "pzmcore@pzmweb.com",
      },
      subject: "PzmCore",
      body: "ENVIO DE EMAIL TESTE",
    });
  }
}
