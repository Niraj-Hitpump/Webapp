import express from "express";
import { register, login, home, user } from "../controller/auth-controller.js";
import validate from "../middlewares/validate-middleware.js";
import { signupSchema, loginSchema } from "../validators/auth-validators.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const router = express.Router();

// Public route
router.get("/", home);

// Routes for user registration and login
router.post("/register", validate(signupSchema), register);
router.post("/login", validate(loginSchema), login);

// Protected route that requires a valid token
router.get("/user", authMiddleware, user);

export default router;
