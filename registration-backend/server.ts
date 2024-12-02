import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes"; // if '.js is needed in runtime

// Initialize dotenv
dotenv.config();

// Create an Express app
const app = express();

// Middleware
app.use(bodyParser.json()); // to handle JSON request bodies

// Set up the MongoDB connection
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Corrected routing
// Use the user registration routes under /api/users instead of /api/register
app.use("/api/users", userRoutes);

// Root route (GET /)
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Registration Backend!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});