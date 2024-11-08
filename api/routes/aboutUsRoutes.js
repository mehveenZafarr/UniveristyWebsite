import express from 'express';
import { getAllAbout } from '../controllers/aboutUsController.js';

const router = express.Router();

router.get('/getAllAbout', getAllAbout);

export default router;