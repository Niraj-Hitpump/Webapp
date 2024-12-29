import express from "express";
import authRoutes from "./router/auth-router.js";
import contactRoutes from "./router/contact-router.js";
import serviceRoute from "./router/service-router.js";
// for admin
import adminRoutes from "./router/admin-router.js";

import connectDb from "./utils/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.FRONTEND_URL // Frontend URL for production (e.g., Vercel)
        : 'http://localhost:5173',  // Local frontend URL for development
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/form", contactRoutes);
app.use("/api/data", serviceRoute);

// admin routes
app.use("/api/admin", adminRoutes);

// Database Connection and Server Start
const PORT = process.env.PORT || 4000;
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
