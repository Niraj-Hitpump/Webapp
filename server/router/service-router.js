import express from "express";
import services from "../controller/service-controller.js";

const router = express.Router();

router.get("/service",services);

export default router