import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  creditHours: { type: Number, required: true },
  program: { type: mongoose.Schema.Types.ObjectId, ref: 'Program' },  // Reference to the Program
  students: [{ 
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    }],  // References to enrolled students
  grades: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      grade: { type: String }
    }
  ],
  pdfFiles: [String],
}, {timestamps: true});

const Course = mongoose.model('Course', courseSchema);

export default Course;