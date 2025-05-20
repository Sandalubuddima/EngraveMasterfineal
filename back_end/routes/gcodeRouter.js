import express from "express";
import { generateGcode } from "./gcodeController.js";

const router = express.Router();

router.post("/api/gcode", generateGcode);

export default router;
