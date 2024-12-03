import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
//import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(bodyParser.json()); 

mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use("/api/users", require("./routes/userRoutes"));
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Registration Backend!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});