import express from "express";
import cors from "cors";
import eventRoute from "./routes/EventRoute.js";
import officerRoute from "./routes/OfficerRoute.js";
import utilsRoute from "./routes/utilsRoute.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

// Configure middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "*", // This allows all domains. In production, restrict to your frontend URL
}));

// Serve static files
app.use("/uploads", express.static("uploads"));

// Register routes
app.use("/", [eventRoute, officerRoute, utilsRoute]);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ 
    error: "Internal server error", 
    message: process.env.NODE_ENV === "development" ? err.message : undefined 
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
