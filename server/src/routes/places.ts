import { Router } from "express";
import GooglePlaces from "../controllers/GooglePlaces";

const router = Router();

router.get("/findPlace", GooglePlaces.getLatlng);

export default router;