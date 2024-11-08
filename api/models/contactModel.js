import mongoose from "mongoose";

const ContactScehma = mongoose.Schema({
    uniName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    telephone: {
        type: [String],
        required: true,
    },
    faxNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
});

const Contact = mongoose.model('Contacts', ContactScehma);
export default Contact;