import express from "express";
import { getEventById, getEvents, createEvent, deleteEventById, updateEventById } from "../controllers/EventController.js";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/events'); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });


router.get('/events', getEvents); // Get all events
router.get('/events/:id', getEventById); // Get an event by ID
router.post('/events', upload.single('banner'), createEvent); // Insert an event
router.delete('/events/:id', deleteEventById); // Get an event by ID
router.patch('/events/:id', upload.single('banner'), updateEventById);

export default router;