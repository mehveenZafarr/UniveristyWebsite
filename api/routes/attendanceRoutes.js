import express from 'express';
import { getAttendances, markAttendance } from '../controllers/attendanceController.js';

const router = express.Router();

router.post('/mark', markAttendance);
router.get('/getAttendances', getAttendances);

export default router;