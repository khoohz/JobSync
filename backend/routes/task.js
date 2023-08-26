import express from "express";
import { getTaskStatus, updateTaskPosition, createTask, updateTask, deleteTask } from "../controllers/tasks.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getTaskStatus);
router.put("/:taskId", verifyToken, updateTask);
router.delete("/delete/:taskId", verifyToken, deleteTask);
router.post("/create", verifyToken, createTask)
router.put("/update/:taskId", verifyToken, updateTask);

export default router;

