import { pool } from "../config/db.js";

// Get all officers
export const getOfficers = async (req, res) => {
    try {
        const [officers] = await pool.query("SELECT * FROM officers");

        const formattedOfficers = officers.map(officer => {
            let socialMedia = null;
            try {
                socialMedia = officer.social_media ? JSON.parse(officer.social_media) : null;
            } catch (error) {
                console.error("Error parsing social_media:", error);
            }

            return {
                ...officer,
                social_media: socialMedia
            };
        });

        res.status(200).json(formattedOfficers);
    } catch (error) {
        console.error("Error fetching officers:", error);
        res.status(500).json({ message: "Database error" });
    }
};

export const getOfficerById = async (req, res) => {
    try {
        const { id } = req.params;
        const [officers] = await pool.query("SELECT * FROM officers WHERE id = ?", [id]);

        if (officers.length === 0) {
            return res.status(404).json({ message: "Officer not found" });
        }

        let socialMedia = null;
        try {
            socialMedia = officers[0].social_media ? JSON.parse(officers[0].social_media) : null;
        } catch (error) {
            console.error("Error parsing social_media:", error);
        }

        const officer = { ...officers[0], social_media: socialMedia };

        res.status(200).json(officer);
    } catch (error) {
        console.error("Error fetching officer:", error);
        res.status(500).json({ message: "Database error" });
    }
};

export const createOfficer = async (req, res) => {
    try {
        const { name, chapter_group, position, email, is_former_officer, social_media, bio } = req.body;

        const formattedSocialMedia = social_media ? JSON.stringify(JSON.parse(social_media)) : null;

        const profilePath = req.file ? `uploads/officers/${req.file.filename}` : null;
        const isFormerOfficerBool = is_former_officer === "true";

        const insertQuery = `
            INSERT INTO officers (name, chapter_group, position, email, is_former_officer, social_media, profile, bio) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await pool.query(insertQuery, [name, chapter_group, position, email, isFormerOfficerBool, formattedSocialMedia, profilePath, bio]);

        res.status(201).json({ message: "Officer added successfully" });
    } catch (error) {
        console.error("Error adding officer:", error);
        res.status(500).json({ message: "Database error" });
    }
};



export const updateOfficerById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, chapter_group, position, email, is_former_officer, social_media, bio, profile } = req.body;

        const profilePath = req.file ? `uploads/officers/${req.file.filename}` : profile;
        const [existingOfficer] = await pool.query("SELECT * FROM officers WHERE id = ?", [id]);

        if (existingOfficer.length === 0) {
            return res.status(404).json({ message: "Officer not found" });
        }
        const isFormerOfficerBool = is_former_officer === "true" ? 1 : 0;

        const updateQuery = `
            UPDATE officers
            SET 
                name = COALESCE(?, name),
                chapter_group = COALESCE(?, chapter_group),
                position = COALESCE(?, position),
                email = COALESCE(?, email),
                is_former_officer = COALESCE(?, is_former_officer),
                social_media = COALESCE(?, social_media),
                bio = COALESCE(?, bio),
                profile = COALESCE(?, profile)
            WHERE id = ?
        `;

        await pool.query(updateQuery, [
            name, chapter_group, position, email,
            isFormerOfficerBool, social_media, bio, profilePath, id
        ]);

        res.status(200).json({ message: "Officer updated successfully" });
    } catch (error) {
        console.error("Error updating officer:", error);
        res.status(500).json({ message: "Database error" });
    }
};


// Delete an officer by ID
export const deleteOfficerById = async (req, res) => {
    try {
        const { id } = req.params;

        const [existingOfficer] = await pool.query("SELECT * FROM officers WHERE id = ?", [id]);

        if (existingOfficer.length === 0) {
            return res.status(404).json({ message: "Officer not found" });
        }

        await pool.query("DELETE FROM officers WHERE id = ?", [id]);

        res.status(200).json({ message: "Officer deleted successfully" });
    } catch (error) {
        console.error("Error deleting officer:", error);
        res.status(500).json({ message: "Database error" });
    }
};
