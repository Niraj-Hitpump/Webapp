import express from "express";
import { 
    getAllUsers, 
    getAllContacts, 
    deleteUserById, 
    deleteContactById 
} from "../controller/admin-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import { adminMiddleware } from "../middlewares/admin-middleware.js";

const router = express.Router();

// Get all users
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

// Delete a user by ID
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUserById);

// Get all contacts
router.get("/contacts", authMiddleware, adminMiddleware, getAllContacts);

// Delete a contact by ID
router.delete("/contacts/:id", authMiddleware, adminMiddleware, deleteContactById);

export default router;
