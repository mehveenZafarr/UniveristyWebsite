import express from 'express';
import { getAllPrograms, getProgramCourses} from '../controllers/programsController.js';

const router = express.Router();

router.get('/getAllPrograms', getAllPrograms);
router.get('/getProgramCourses/:id', getProgramCourses);
// router.post('/postCourses', postCourses);

export default router;