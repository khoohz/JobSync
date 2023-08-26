import express from "express";
import { getUserPerformance } from "../controllers/managements.js";

const router = express.Router();

router.get("/performance/:id", getUserPerformance);

export default router; 