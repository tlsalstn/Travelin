import { Router } from "express";
import user from "./user";
import places from "./places";
import bulletin from "./bulletin";
import { checkToken } from "../middlewares/CheckToken";

const router = Router();

router.use('/user', user);
router.use('/post', bulletin);
router.use('/places', places);

export default router;