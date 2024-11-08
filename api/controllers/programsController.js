import Program from '../models/ProgramsModel.js';
import Course from '../models/courseModel.js';
export const getAllPrograms = async (req, res) => {
   try {
     const response = await Program.find().populate('courses');
     res.status(200).json(response);
   } catch (error) {
    console.log("Error in programs controller: "+error.message);
    res.status(500).json({error: error.message});
   }
}

export const getProgramCourses = async (req, res) => {
  try {
    const {id} = req.params;
    const response = await Program.findOne({_id:id}).populate("courses");
    res.status(200).json(response.courses);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}