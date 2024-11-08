// import mongoose from "mongoose";

// const programSchema = new mongoose.Schema({
//     name: { type: String, required: true },  // e.g., "Computer Science"
//     duration: { type: Number, required: true },  // e.g., 4 years
//     degreeType: { type: String, required: true },  // e.g., "Bachelors", "Masters"
//     courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],  // List of courses in this program
//   });
  
// const Program = mongoose.model('Program', programSchema);

// export default Program;
import mongoose from "mongoose";
// import Course from './courseModel.js';  // Import Course to avoid circular dependency issues

const programSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  degreeType: { type: String, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],  // Referencing Course here
});

const Program = mongoose.model('Program', programSchema);

export default Program;
