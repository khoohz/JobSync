import express from "express";
import { login } from "../controllers/auths.js";

const router = express.Router();

router.post("/login", login);

export default router;
