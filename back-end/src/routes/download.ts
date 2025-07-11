import { Router } from "express";
import downloadController from "../controllers/download";

const router = Router();

router.get("/", downloadController.download);
router.get("/merged-download", downloadController.downloadMerged);

export default router;
