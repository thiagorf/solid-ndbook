import { Router } from "express";
import { UserController } from "../../../presenters/controllers/users/user-controller";

const userController = new UserController();

const router = Router();

router.post("/", userController.post);
router.post("/authenticate", userController.authenticate);


export { router as userRouter}