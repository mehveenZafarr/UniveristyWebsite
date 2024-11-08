import mongoose from "mongoose";

const announcementSchema = mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;