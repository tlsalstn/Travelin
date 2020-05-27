import { Router } from "express";
import UserController from "../controllers/UserController";
import AuthController from "../controllers/AuthController";

const router = Router();

router.get("/getUser", UserController.getUser);
router.get("/getUsers", UserController.getUsers);

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export default router;