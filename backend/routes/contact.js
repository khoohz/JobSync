import express from "express";
import {
  getContacts,
  getOneContact,
  updateContact,
  deleteContact,
  createContact
} from "../controllers/contacts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getContacts);
router.get("/:contactId", verifyToken, getOneContact);
router.post("/create", verifyToken, createContact)
router.put("/update/:contactId", verifyToken, updateContact);
router.delete("/delete/:contactId", verifyToken, deleteContact);

export default router;

