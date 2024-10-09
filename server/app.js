import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import auth_route from "./routes/auth.js"; // Importing authentication routes
import protect from "./middleware/protectRoute.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(express.json()); // Parses incoming JSON requests

// CORS Configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    allowedHeaders: ['Content-Type', 'Authorization'],
};
  
  app.use(cors(corsOptions));
  
app.use(cookieParser()); 

// Logging Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Route Definitions
app.use("/api/v1/auth", auth_route); // Authentication routes

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
    });
});


export default app; // Exports the app for use in server.js
