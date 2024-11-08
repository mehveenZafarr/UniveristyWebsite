import express from 'express';
import { getAllfaculty, getfaculty } from '../controllers/AcademicsController.js';

const router = express.Router();

router.get('/faculties', getAllfaculty);
router.get('/faculties/:id', getfaculty);

export default router;