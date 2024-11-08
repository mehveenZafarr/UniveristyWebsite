import Attendance from "../models/AttendanceModel.js";

// export const markAttendance = async (req, res) => {
//     try {
//         const {student, course, status} = req.body;
//         const attendance = new Attendance({
//             student,
//             course,
//             status
//         });
//         await attendance.save();
//         res.status(200).json(attendance);
//     } catch (error) {
//         res.status(500).json({error: error.message});
//     }
// }

export const markAttendance = async (req, res) => {
    try {
      const attendances = req.body;  // Expecting an array of attendance data
      
      const savedAttendances = await Attendance.insertMany(attendances);
      
      res.status(200).json(savedAttendances);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

export const getAttendances = async (req, res) => {
    try {
        const response = await Attendance.find()
        .populate({
            path: "student",
            select: "-password"
        })
        .populate({
            path: "course",
            select: "-grades"
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}