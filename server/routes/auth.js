import express from "express";
import { register, login, Email } from "../controllers/v1/auth_controller.js"; // Adjust path if needed
import { buyTicket, viewTicketHistory } from '../controllers/v1/ticket_controller.js'; // Import controller functions
import validate from "../middleware/validate.js"; // Import the validation middleware
import verify_mail from '../middleware/verify_mail.js';
import { registerSchema, loginSchema } from "../validator/validate_schema.js"; // Import Zod validation schemas

const router = express.Router();

// Register route with validation
router.post("/register", validate(registerSchema), register);

// Login route with validation
router.post("/login", validate(loginSchema), login);

//email route
router.post("/email", Email);

//buy route
router.post('/buy', verify_mail, buyTicket); 

// View Ticket History Route
router.get('/history', verify_mail, viewTicketHistory);


export default router;
