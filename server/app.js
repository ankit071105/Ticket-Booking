import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import auth_route from "./routes/auth.js"; // Importing authentication routes


const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Enables CORS for cross-origin requests
app.use(cookieParser()); // Parses cookies

// Route Definitions
app.use("/api/v1/auth", auth_route); // Authentication routes


export default app; // Exports the app for use in server.js
