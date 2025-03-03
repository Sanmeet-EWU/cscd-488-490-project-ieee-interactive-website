import { pool } from "../config/db.js";

// Get all officers
export const getOfficers = async (req, res) => {
  try {
    // Query all officers from the database
    const [officers] = await pool.query("SELECT * FROM officers");

    // Format each officers social_Medial field from JSON string to a javascript object
    const formattedOfficers = officers.map((officer) => {
      let socialMedia = null;
      try {
        // Parse social_media field from JSON string to a javascript object
        socialMedia = officer.social_media
          ? JSON.parse(officer.social_media)
          : null;
      } catch (error) {
        // Log parsing errors without crashing the entire process
        console.error("Error parsing social_media:", error);
      }
      // Return the officer object with the parsed social_media field
      return {
        ...officer,
        social_media: socialMedia,
      };
    });

    // Send the formatted list of officers as a JSON response
    res.status(200).json(formattedOfficers);
  } catch (error) {
    // Log and return error if fetching officers fails
    console.error("Error fetching officers:", error);
    res.status(500).json({ message: "Database error" });
  }
};
// Get a single officers ID
export const getOfficerById = async (req, res) => {
  try {
    const { id } = req.params; // Retrieve officer ID from request paramters
    // Query the database for the officer with the given ID
    const [officers] = await pool.query("SELECT * FROM officers WHERE id = ?", [
      id,
    ]);

    // If no officer is found, return a 404 response
    if (officers.length === 0) {
      return res.status(404).json({ message: "Officer not found" });
    }

    // Attempt to parse the social_media JSON string, if it exists
    let socialMedia = null;
    try {
      socialMedia = officers[0].social_media
        ? JSON.parse(officers[0].social_media)
        : null;
    } catch (error) {
      console.error("Error parsing social_media:", error);
    }

    // Create the officer object with the parsed social_media field
    const officer = { ...officers[0], social_media: socialMedia };

    // Return the officer details as a JSON response
    res.status(200).json(officer);
  } catch (error) {
    // Log and return error if fetching officer fails
    console.error("Error fetching officer:", error);
    res.status(500).json({ message: "Database error" });
  }
};

// Creates a new officer
export const createOfficer = async (req, res) => {
  try {
    const {
      name,
      chapter_group,
      position,
      email,
      is_former_officer,
      social_media,
      bio,
    } = req.body;

    // Format social_media by parsing and then stringifying the JSON object
    const formattedSocialMedia = social_media
      ? JSON.stringify(JSON.parse(social_media))
      : null;

    // Determine file path for the officers profile image if uploaded
    const profilePath = req.file
      ? `uploads/officers/${req.file.filename}`
      : null;
    // Convert the is_former_officer string to a boolean value
    const isFormerOfficerBool = is_former_officer === "true";

    // Prepare the insert query for creating a new officer
    const insertQuery = `
            INSERT INTO officers (name, chapter_group, position, email, is_former_officer, social_media, profile, bio) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

    // Execute the insert query with the provided values
    await pool.query(insertQuery, [
      name,
      chapter_group,
      position,
      email,
      isFormerOfficerBool,
      formattedSocialMedia,
      profilePath,
      bio,
    ]);

    // Return a success message upon creation
    res.status(201).json({ message: "Officer added successfully" });
  } catch (error) {
    // Log and return error if officer creation fails
    console.error("Error adding officer:", error);
    res.status(500).json({ message: "Database error" });
  }
};

// Updates an officer by ID
export const updateOfficerById = async (req, res) => {
  try {
    const { id } = req.params; // Retrieve officer ID from request parameters
    const {
      name,
      chapter_group,
      position,
      email,
      is_former_officer,
      social_media,
      bio,
      profile,
    } = req.body; // Destructure fields from the request body

    // Determine new profile image path if a file is uploaded; otherwise use the existing profile path
    const profilePath = req.file
      ? `uploads/officers/${req.file.filename}`
      : profile;

    // Check if the officer exists in the database
    const [existingOfficer] = await pool.query(
      "SELECT * FROM officers WHERE id = ?",
      [id],
    );

    if (existingOfficer.length === 0) {
      return res.status(404).json({ message: "Officer not found" });
    }
    // Convert is_former_officer to a numeric value (1 for true, 0 for false)
    const isFormerOfficerBool = is_former_officer === "true" ? 1 : 0;

    // Build the update query using COALESCE to retain existing values if new ones are not provided
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

    // Execute the update query with the provided values
    await pool.query(updateQuery, [
      name,
      chapter_group,
      position,
      email,
      isFormerOfficerBool,
      social_media,
      bio,
      profilePath,
      id,
    ]);

    // Return a success message after update
    res.status(200).json({ message: "Officer updated successfully" });
  } catch (error) {
    // Log and return error if updating officer fails
    console.error("Error updating officer:", error);
    res.status(500).json({ message: "Database error" });
  }
};

// Delete an officer by ID
export const deleteOfficerById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the officer exists before deletion
    const [existingOfficer] = await pool.query(
      "SELECT * FROM officers WHERE id = ?",
      [id],
    );

    if (existingOfficer.length === 0) {
      return res.status(404).json({ message: "Officer not found" });
    }

    // Execute the deletion query
    await pool.query("DELETE FROM officers WHERE id = ?", [id]);

    // Return a success message upon deletion
    res.status(200).json({ message: "Officer deleted successfully" });
  } catch (error) {
    // Log and return error if deletion fails
    console.error("Error deleting officer:", error);
    res.status(500).json({ message: "Database error" });
  }
};
