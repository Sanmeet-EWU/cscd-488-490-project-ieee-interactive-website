import express from "express";
import { verifyAdmin } from "../controllers/AdminAuthController.js";

const router = express.Router();

// Example protected admin route
router.get("/AdminDashboard", verifyAdmin, (req, res) => {
  res.json({ message: "Welcome, Admin!", admin: req.user });
});

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> dc94d8873728419495ab7b2dafb8ac1a9c286fa7
