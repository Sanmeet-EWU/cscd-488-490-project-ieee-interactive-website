import { pool } from "../config/db.js";

// Insert a new event
export const createEvent = async (req, res) => {
    try {
        console.log('Received body:', req.body); // Debugging

        const { title, event_date, event_time, description, location, link } = req.body;
        const banner = req.file ? `uploads/events/${req.file.filename}` : null;

        const [result] = await pool.query(
            `INSERT INTO events (title, event_date, event_time, description, banner, location, link) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title, event_date, event_time, description, banner, location, link]
        );

        res.status(201).json({ message: 'Event created successfully', eventId: result.insertId });
    } catch (error) {
        console.error('Error inserting event:', error);
        res.status(500).json({ message: 'Database error' });
    }
};


// Get all events
export const getEvents = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM events ORDER BY event_date DESC');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Database error' });
    }
}

// Get a single event by ID
export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ message: 'Database error' });
    }
}

// Delete a single event by ID
export const deleteEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM events WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Database error' });
    }
};

export const updateEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, event_date, event_time, link, location } = req.body;
        const banner = req.file ? `uploads/events/${req.file.filename}` : null;

        const [existingEvent] = await pool.query('SELECT * FROM events WHERE id = ?', [id]);

        if (existingEvent.length === 0) {
            return res.status(404).json({ message: "Event not found" });
        }

        const updateQuery = `
            UPDATE events
            SET 
                title = COALESCE(?, title),
                description = COALESCE(?, description),
                event_date = COALESCE(?, event_date),
                event_time = COALESCE(?, event_time),
                location = COALESCE(?, location),
                link = COALESCE(?, link),
                banner = COALESCE(?, banner)
            WHERE id = ?
        `;

        await pool.query(updateQuery, [title, description, event_date, event_time, location, link, banner, id]);

        res.status(200).json({ message: "Event updated successfully" });

    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ message: "Database error" });
    }
};