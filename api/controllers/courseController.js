import Course from "../models/courseModel.js";
import User from "../models/userModel.js";
import path from 'path';

export const getCourse = async (req, res) => {
    try {
        const {id} = req.params;
        const response = await Course.findById({_id: id}).populate({
            path: "students",
            select: "-password"
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const putGrades = async (req, res) => {
    try {
        const { grades } = req.body; // Array of grades { student, grade }
        const { courseId } = req.params;
    
        // Update the course with new grades
        const course = await Course.findByIdAndUpdate(
          courseId,
          { $set: { grades } },
          { new: true }
        );
    
        res.status(200).json(course);
      } catch (error) {
        console.error('Error updating grades:', error);
        res.status(500).send('Server error');
      }
}

export const enrollStudenttoCourses = async (req, res) => {
  try {
    let {courseIds} = req.body;
    const {studentId} = req.params;
    const student = await User.findById(studentId);

    // Ensure courseIds is an array
    if (!Array.isArray(courseIds)) {
      // Log in case it's not an array
      console.log("courseIds is not an array, received:", courseIds);
      courseIds = courseIds ? [courseIds] : [];
    }

    for(const courseId of courseIds) {
      const course = await Course.findById(courseId);

      // Check if the student is already enrolled in the course
      if (course.students.includes(student._id)) {
        res.status(400).json({error: `Student is already enrolled in the course => ${course.name}.`});
        break;
        // continue;
      }

      course.students.push(student._id);
      await course.save();

      // Add the course to the student's courses array
      if (!student.courses.includes(course._id)) {
        student.courses.push(course._id);
      }

      // Save the student after processing all courses
    await student.save();
    }
    res.status(200).json({
      message: 'Student successfully enrolled in the selected courses.'
    });
  } catch (error) {
    console.log("Error in enroll: "+error.message);
    res.status(500).json({error: error.message});
  }
}

export const getEnrolledCourses = async (req, res) => {
  try {
    const {id} = req.params;
    const courses = await Course.find({students: id})
    .select("-grades")
    .select("-students")
    .populate("program");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}
export const getEnrolledCoursesGrades = async (req, res) => {
  try {
    const {id} = req.params;
    const courses = await Course.find({students: id})
    // .select("-grades")
    .select("-students")
    .populate({
      path: "grades.student",
      select: "-password"
    })
    .populate("program");
    const filteredCourses = courses.map(course => {
      const filteredGrades = course.grades.filter(grade => grade.student._id.toString() === id);
      return { 
        ...course._doc, // Retain other course fields
        grades: filteredGrades 
      };
    });
    res.status(200).json(filteredCourses);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

export const uploadCoursePdfs = async (req, res) => {
  try {
    const {id} = req.params;
    if(!req.files || req.files.length === 0) {
      return res.status(404).json({error: "No files uploaded!"});
    }
    const course = await Course.findById(id);
    // course.pdfFiles.push(req.files.map((file) => file.path));
    // Push each file path to the pdfFiles array
    // req.files.forEach(file => {
    //   course.pdfFiles.push(file.path);
    // });
    req.files.forEach(file => {
      const relativePath = path.join('uploads', file.filename); // Store relative path
      course.pdfFiles.push(relativePath);
    });

    await course.save();
    const uploadedFiles = req.files.map(file => {
      return path.join('uploads', file.filename); // Store relative path
    });
    res.status(200).json({message: 'PDF uploaded successfully!', pdfUrl: uploadedFiles});
  } catch (error) {
    res.status(500).json({error: "An error occured during the upload => "+ error.message});
  }
}

export const getCoursesWithPdf = async (req, res) => {
  try {
    const coursesWithPdf = await Course.find({pdfFiles: {$exists: true, $ne:[]}})
    .select("-grades")
    .select("-students")
    .populate("program");
    res.status(200).json(coursesWithPdf);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

export const removePdf = async (req, res) => {
  try {
    const {id} = req.params;
    const {pdfFileUrl} = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(id,
      {$pull: {pdfFiles: pdfFileUrl}},
      {new: true}
    );
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found!" });
    }
    res.status(200).json({message: "Pdf file removed successfully!", updatedCourse});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}