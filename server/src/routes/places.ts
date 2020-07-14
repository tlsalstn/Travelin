import { Router } from "express";
import GooglePlaces from "../controllers/GooglePlaces";

const router = Router();

router.get("/findPlace", GooglePlaces.getPlace);

export default router;