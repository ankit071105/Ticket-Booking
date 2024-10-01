import express from 'express';
import { register, login } from '../controllers/v1/auth_controller';

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

export default router;
