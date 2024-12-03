import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Handle user registration
router.post("/", async (req, res) => {
  const { firstName, lastName, email, phoneNumber, kingschat_username, country } = req.body;

  try {
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      kingschat_username,
      country,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

export default router;
