import express from 'express';
import { getMe, login, logout, registerUser, getStudentInfo } from '../controllers/authController.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/me', protectRoute, getMe);
router.post('/register', registerUser);
router.post('/login', login);
router.post('/logout', logout);
router.get('/getStudentInfo/:id', getStudentInfo);

export default router