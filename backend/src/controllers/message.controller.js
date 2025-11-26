//Todo : Get All messages
//Todo : Create a message

import Message from "../models/Message.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllMessages = async (req, res) => {
    try {
        const teamId = req.params.teamId;

        const messages = await Message.find({ teamId });

        if (!messages) {
            return res.status(404).json({ message: "No messages found for this team" });
        };
        return res.status(200).json({ messages });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const createMessage = async (req, res) => {
    try {
        const { message, image } = req.body;
        const teamId = req.params.teamId;
        const userId = req.user._id;

        if (!message && !image) {
            return res.status(400).json({ message: "Message content is required" });
        }

        if (image){
            imageUploader = cloudinary.uploader.upload(image);
            imageUrl = imageUploader.secure_url;
        }

        const newMessage = new Message({
            teamId,
            userId,
            message,
            image: imageUrl,
        });

        if (!newMessage) {
            return res.status(400).json({ message: "Message creation failed" });
        }

        await newMessage.save();

        return res.status(201).json(newMessage);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};