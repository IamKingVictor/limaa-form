import express from "express";
import User from "../models/User";

const router = express.Router();

router.post("/", async (req, res) => {
  const { 
    firstName, 
    lastName, 
    email, 
    phoneNumber, 
    kingschat_username, 
    country, 
    zone 
  } = req.body;

  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      kingschat_username,
      country,
      zone, // Add zone to the user creation
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      message: "Error registering user", 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
});

export default router;