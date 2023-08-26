import express from "express";
import { getTemplates } from "../controllers/templates.js";

const router = express.Router();

router.get("/templates", getTemplates);

export default router;
