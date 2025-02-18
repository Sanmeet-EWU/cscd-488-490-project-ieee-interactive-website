import express from "express";
import { verifyAdmin } from "../controllers/AdminAuthController.js";

const router = express.Router();

// Example protected admin route
router.get("/AdminDashboard", verifyAdmin, (req, res) => {
  res.json({ message: "Welcome, Admin!", admin: req.user });
});

export default router;