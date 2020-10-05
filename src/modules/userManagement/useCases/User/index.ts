import { MailtrapMailProvider } from "../../../../providers/implementations/MailtrapMailProvider";
import { UserController } from "./UserController";

const mailProvider = new MailtrapMailProvider();
const userController = new UserController(mailProvider);
export { userController };
