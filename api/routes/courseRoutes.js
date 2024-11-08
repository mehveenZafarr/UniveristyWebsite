import express from 'express';
import { getCourse, putGrades, enrollStudenttoCourses, getEnrolledCourses, uploadCoursePdfs, getCoursesWithPdf, removePdf, getEnrolledCoursesGrades } from '../controllers/courseController.js';
import upload from '../libs/utils/uploadPdf.js';

const router = express.Router();

router.get('/getCourse/:id', getCourse);
router.put('/:courseId/grades', putGrades);
router.post('/enroll/:studentId', enrollStudenttoCourses);
router.get('/getEnrolledCourses/:id', getEnrolledCourses);
router.get('/getEnrolledCoursesGrades/:id', getEnrolledCoursesGrades);
router.get('/course-with-pdfs', getCoursesWithPdf);
router.put('/:id/removePdf', removePdf);
router.post('/upload-pdf/:id', upload.array("pdfs", 100), uploadCoursePdfs);
// router.post('/upload-pdf/:id', upload.array("pdfs", 100), uploadCoursePdfs);

export default router;