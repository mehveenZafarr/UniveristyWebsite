import AboutUs from "../models/aboutUsModel.js";

export const getAllAbout = async (req, res) => {
    try {
        const response = await AboutUs.find();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: "Internal server error! "+error.message});
    }
}