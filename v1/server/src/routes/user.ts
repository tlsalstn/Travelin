import { Router } from "express";
import UserController from "../controllers/UserController";
import AuthController from "../controllers/AuthController";
import { checkToken } from "../middlewares/CheckToken";

const router = Router();

router.get("/getUser", checkToken, UserController.getUser);
router.get("/getUsers", UserController.getUsers);

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export default router;