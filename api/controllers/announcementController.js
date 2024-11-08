import Announcement from "../models/AnnouncementModel.js";

export const makeAnnouncement = async (req, res) => {
    try {
        const {subject, description} = req.body;

        if(!subject || !description) {
            return res.status(400).json({error: "Please provide all details!"});
        }

        const announce = new Announcement({subject, description});
        await announce.save();

        res.status(200).json(announce);
    } catch (error) {
        console.log("Error in making announcement: "+error.message);
        res.status(500).json({error: error.message});
    }
}

export const getAnnouncements = async (req, res) => {
    try {
        const response = await Announcement.find();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const deleteAnnouncement = async (req, res) => {
    try {
        const {id} = req.params;
        const announcement = await Announcement.findByIdAndDelete(id);
        res.status(200).json(announcement);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}