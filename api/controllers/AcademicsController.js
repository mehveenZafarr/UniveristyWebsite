import Academic from "../models/academicsModel.js";

export const getAllfaculty = async (req, res) => {
    try {
        const response = await Academic.find();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error: "Internal Server Error! "+error.message});
    }
}
export const getfaculty = async (req, res) => {
    try {
        const {id} = req.params;
        const response = await Academic.find({_id: id});
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}