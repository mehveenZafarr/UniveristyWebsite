import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['P', 'A'], default: 'A' }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
