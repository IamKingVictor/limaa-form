"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// MongoDB connection
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/user_registration"; // Fallback to local DB if env variable is missing
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => console.log("✅ Successfully connected to MongoDB"))
    .catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the application if DB connection fails
});
// Routes
app.use("/api/register", userRoutes_1.default);
// Start server
const PORT = process.env.PORT || 5000; // Use the PORT from .env or default to 5000
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
