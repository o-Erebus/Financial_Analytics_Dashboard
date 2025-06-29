import express from 'express';
import { loginUser, registerUser, getUserProfile } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser); // For initial user setup
router.get('/profile', protect, getUserProfile);

export default router;