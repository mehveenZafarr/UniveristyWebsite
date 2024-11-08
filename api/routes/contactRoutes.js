import express from 'express';
import { contactUs } from '../controllers/contactController.js';

const router = express.Router();

router.get('/contactUs', contactUs);

export default router;