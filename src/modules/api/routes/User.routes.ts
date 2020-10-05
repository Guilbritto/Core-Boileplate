import { Router } from "express";
import { userController } from "../../userManagement/useCases/User";

const userRoute = Router();

userRoute.get("/", userController.getUsers.bind(userController));

userRoute.post("/", userController.createUser.bind(userController));

export { userRoute };
