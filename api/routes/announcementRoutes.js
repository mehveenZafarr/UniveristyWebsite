import express from 'express';
import { getAnnouncements, makeAnnouncement, deleteAnnouncement } from '../controllers/announcementController.js';

const router = express.Router();

router.post('/makeAnnouncement', makeAnnouncement);
router.get('/getAnnouncements', getAnnouncements);
router.delete('/deleteAnnouncement/:id', deleteAnnouncement);

export default router;