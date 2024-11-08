import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
    name: { type: String, required: true },  // e.g., "Computer Science"
    duration: { type: Number, required: true },  // e.g., 4 years
    degreeType: { type: String, required: true },  // e.g., "Bachelors", "Masters"
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],  // List of courses in this program
  });
  
const Prog = mongoose.model('prog', programSchema);

export default Prog;