import { pool } from "../config/db.js"; // Database connection

// Insert a new event
export const createEvent = async (req, res) => {
  try {
    console.log("Received body:", req.body); // Debugging statement

    // Extract event details from request body
    const { title2, event_date, event_time, description, location, link, banner } =
      req.body;

    // Banner is now a Cloudinary URL passed directly in the request body
    // No need to handle local file uploads

    // Insert event details into the database
    const [result] = await pool.query(
      `INSERT INTO events (title2, event_date, event_time, description, banner, location, link) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title2, event_date, event_time, description, banner, location, link],
    );

    // Respond with success message and the inserted event ID
    res.status(201).json({
      message: "Event created successfully",
      eventId: result.insertId,
    });
  } catch (error) {
    console.error("Error inserting event:", error);
    res.status(500).json({ message: "Database error" });
  }
};

// Get all events
export const getEvents = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM events ORDER BY event_date DESC",
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Database error" });
  }
};

// Get a single event by ID
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch event from the database based on ID
    const [rows] = await pool.query("SELECT * FROM events WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Send the found event as a JSON response
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Database error" });
  }
};

// Delete a single event by ID
export const deleteEventById = async (req, res) => {
  try {
    const { id } = req.params;

    // Get the event before deletion
    const [existingEvent] = await pool.query(
      "SELECT * FROM events WHERE id = ?",
      [id]
    );

    if (existingEvent.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    // No need to delete local files since we're using Cloudinary URLs

    // Delete the event from database
    const [result] = await pool.query("DELETE FROM events WHERE id = ?", [id]);

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Database error" });
  }
};

// Update an event by its id
export const updateEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title2, description, event_date, event_time, link, location, banner } =
      req.body;

    // Check if the event exists before updating
    const [existingEvent] = await pool.query(
      "SELECT * FROM events WHERE id = ?",
      [id],
    );

    // If event doesn't exist, return a 404 response
    if (existingEvent.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }
    // Update query using COALESCE to keep existing values if new ones are not provided
    const updateQuery = `
            UPDATE events
            SET 
                title2 = COALESCE(?, title2),
                description = COALESCE(?, description),
                event_date = COALESCE(?, event_date),
                event_time = COALESCE(?, event_time),
                location = COALESCE(?, location),
                link = COALESCE(?, link),
                banner = COALESCE(?, banner)
            WHERE id = ?
        `;

    // Execute update query with provided values
    await pool.query(updateQuery, [
      title2,
      description,
      event_date,
      event_time,
      location,
      link,
      banner,
      id,
    ]);

    // Respond with success message
    res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Database error" });
  }
};
