import express from "express";
import {
  getApplication,
  getOneApplication,
  updateApplication,
  createApplication,
  deleteApplication
} from "../controllers/applications.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getApplication);
router.get("/:appId", verifyToken, getOneApplication);
router.put("/update/:appId", verifyToken, updateApplication);
router.post("/post", verifyToken, createApplication)
router.delete("/delete", verifyToken, deleteApplication);

export default router;
