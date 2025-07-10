import { Router } from "express";
import youtubeController from "../controllers/youtube";

const router = Router();

router.post("/get-video-info", youtubeController.getAll);

export default router;
