import express from "express";
import { getUser, getDashboardApps } from "../controllers/general.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/user/:id", verifyToken, getUser);
router.get("/dashboard/applications", verifyToken, getDashboardApps);

export default router;
