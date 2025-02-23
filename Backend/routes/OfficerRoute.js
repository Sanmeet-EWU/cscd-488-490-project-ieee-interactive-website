import express from "express"; // Import Express framework
import multer from "multer"; // Import multer for handling file uploads
import path from "path"; // Import path module for working with file and directory paths
import {
  getOfficers,
  getOfficerById,
  createOfficer,
  updateOfficerById,
  deleteOfficerById,
} from "../controllers/OfficerController.js"; // Import officer controller functions

const router = express.Router(); // Create new router instance

// Configure multer storage for handling officer profile uploads
const storage = multer.diskStorage({
  // Set the destination directory for uploaded files
  destination: (req, file, cb) => {
    cb(null, "uploads/officers");
  },
  // Customize the filename to include a timestamp to avoid collisions
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize multer with the defined storage configuration
const upload = multer({ storage });

router.get("/officers", getOfficers); // Get all officers
router.get("/officers/:id", getOfficerById); // Get officer by ID
router.post("/officers", upload.single("profile"), createOfficer); // Create officer
router.patch("/officers/:id", upload.single("profile"), updateOfficerById); // Update officer
router.delete("/officers/:id", deleteOfficerById); // Delete officer

export default router;
