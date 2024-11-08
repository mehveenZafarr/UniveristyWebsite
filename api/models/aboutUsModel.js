import mongoose from "mongoose";

const AboutUsSchema = mongoose.Schema({
    page: {
        type: String,
        // required: true
    },
    title: {
        type: String,
        // required: true
    },
    description: [
        {
            heading: String,
            content: {type: String, required: true}
        }
    ],
}, {timestamps: true});

const AboutUs = mongoose.model('AboutUs', AboutUsSchema);
export default AboutUs;