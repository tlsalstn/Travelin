import { Router } from "express";
import ShareController from "../controllers/ShareController";

const router = Router();

router.post("/createShare", ShareController.createPost);
router.get("/getShare", ShareController.getPosts);

export default router;