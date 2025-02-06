import express from "express";
import multer from "multer";
import path from "path";
import {
  getOfficers,
  getOfficerById,
  createOfficer,
  updateOfficerById,
  deleteOfficerById
} from "../controllers/OfficerController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/officers'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.get('/officers', getOfficers); // Get all officers
router.get('/officers/:id', getOfficerById); // Get officer by ID
router.post('/officers', upload.single('profile'), createOfficer); // Create officer
router.patch('/officers/:id', upload.single('profile'), updateOfficerById); // Update officer
router.delete('/officers/:id', deleteOfficerById); // Delete officer

export default router;