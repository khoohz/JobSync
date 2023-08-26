import express from "express";
import { getTaskStatus, updateTaskPosition, updateTask, deleteTask } from "../controllers/tasks.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getTaskStatus);
router.get("/update-position", verifyToken, updateTaskPosition);
router.put("/:taskId", verifyToken, updateTask);
router.delete("/delete/:taskId", verifyToken, deleteTask);

export default router;

