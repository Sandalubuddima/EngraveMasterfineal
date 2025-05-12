import express from 'express';
import {
  submitContact,
  getAllContacts,
  deleteContact
} from '../controllers/contactController.js';

const router = express.Router();

// Public form submission route
router.post("/", submitContact);

// Admin-only routes
router.get("/", getAllContacts);
router.delete("/:id", deleteContact);

export default router;
