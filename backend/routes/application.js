import express from "express";
import {
  getApplication,
  getOneApplication,
  updateApplication,

} from "../controllers/applications.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getApplication);
router.get("/:appId", verifyToken, getOneApplication);
router.put("/update/:appId", verifyToken, updateApplication);

export default router;
