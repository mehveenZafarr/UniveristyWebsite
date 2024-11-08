import Contact from "../models/contactModel.js";

export const contactUs = async (req, res) => {
    try {
        const response = await Contact.find();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: "Internal Server Error! "+error.message});
    }
}