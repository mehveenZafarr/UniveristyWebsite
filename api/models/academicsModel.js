import mongoose, { mongo } from "mongoose";

const AcademicSchema = mongoose.Schema({
    facultyDepTitle: {
        type: String,
        required: true
    },
    departments : [
        {
            name: String,
            programsNumbers: String,
            facultyMembersNo: String,
        }
    ],
});

const Academic = mongoose.model('Academic', AcademicSchema);

export default Academic;