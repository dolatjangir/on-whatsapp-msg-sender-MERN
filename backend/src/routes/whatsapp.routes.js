import express from "express";
import { sendTemplate } from "../controllers/whatsapp.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/send-template", upload.single("image"), sendTemplate);

export default router;
