import express from "express";
import {
  getCompanies,
  getOneCompany,
  updateCompany,
  deleteCompany,
  createCompany
} from "../controllers/companies.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getCompanies);
router.get("/:companyId", verifyToken, getOneCompany);
router.post("/create", verifyToken, createCompany)
router.put("/update/:companyId", verifyToken, updateCompany);
router.delete("/delete/:companyId", verifyToken, deleteCompany);

export default router;

