import express from "express";
// Import event controller functions for handling event-related routes
import {
  getEventById,
  getEvents,
  createEvent,
  deleteEventById,
  updateEventById,
} from "../controllers/EventController.js";
import multer from "multer";
const router = express.Router(); // Create a new Express router instance

// Configure multer storage for handling file uploads for events
const storage = multer.diskStorage({
  // Sets destination folder for uploaded files
  destination: (req, file, cb) => {
    cb(null, "uploads/events");
  },
  // Sets filename for uploaded files to include a time stamp
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize multer with the defined storage configuration
const upload = multer({ storage });

router.get("/events", getEvents); // Get all events
router.get("/events/:id", getEventById); // Get an event by ID
router.post("/events", upload.single("banner"), createEvent); // Insert an event
router.delete("/events/:id", deleteEventById); // Get an event by ID
router.patch("/events/:id", upload.single("banner"), updateEventById);

export default router;
