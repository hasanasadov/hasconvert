import { Router } from "express";
import youtubeController from "../controllers/youtube";

const router = Router();

router.post("/get-video-info", youtubeController.getAll);
router.post("/posts", youtubeController.myOwn);

export default router;
