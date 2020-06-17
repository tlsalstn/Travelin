import { Router } from "express";
import ShareController from "../controllers/ShareController";
import { checkToken } from "../middlewares/CheckToken";

const router = Router();

router.post("/createShare", checkToken, ShareController.createPost);
router.get("/getShare", ShareController.getPosts);

export default router;