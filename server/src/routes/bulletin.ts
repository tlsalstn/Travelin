import { Router } from "express";
import ShareController from "../controllers/ShareController";
import { checkToken } from "../middlewares/CheckToken";

const router = Router();

router.post("/createShare", checkToken, ShareController.createPost);
router.get("/getShare", ShareController.getPosts);
router.get("/getMyShare", checkToken, ShareController.getMyPosts);
router.delete("/remove", ShareController.remove);

export default router;