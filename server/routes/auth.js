import express from 'express';
import { register, login } from '../controllers/v1/auth_controller.js'; // Adjust path if needed
import validate from '../middleware/validate.js'; // Import the validation middleware
import { registerSchema, loginSchema } from '../validator/validate_schema.js'; // Import Zod validation schemas

const router = express.Router();

// Register route with validation
router.post('/register', validate(registerSchema), register);

// Login route with validation
router.post('/login', validate(loginSchema), login);

export default router;
