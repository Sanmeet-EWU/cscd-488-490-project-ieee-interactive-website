import { pool } from "../config/db.js";
import jwt from "jsonwebtoken";

export const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from header

    if (!token) {
      return res.status(401).json({ message: "Unauthorized. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

    const [user] = await pool.query("SELECT * FROM admins WHERE id = ?", [decoded.id]);

    if (user.length === 0 || !user[0].is_admin) {
      return res.status(403).json({ message: "Forbidden. Admin access required." });
    }

    req.user = user[0]; // Store user info in request
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    console.error("Authorization error:", error);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> dc94d8873728419495ab7b2dafb8ac1a9c286fa7
