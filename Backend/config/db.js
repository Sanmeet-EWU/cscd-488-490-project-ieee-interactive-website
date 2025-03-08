import mysql from "mysql2/promise";
import "dotenv/config";

export const pool = mysql.createPool({
  host: "metro.proxy.rlwy.net",
  // host: "mysql.railway.internal",
  user: "root",
  password: "zqlIaEmclbQwIWrJxUACRuQJwohQYGhg",
  database: "railway",
  port: 43379,  // Use the provided proxy port
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000  // Increased timeout
});


// Test database connection
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to database!");
    connection.release(); // Release connection back to the pool
  } catch (err) {
    console.error("Error connecting to database:", err);
  }
})();