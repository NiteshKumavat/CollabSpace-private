import Message from "../models/Message.js";
import Project from "../models/Project.js";
import cloudinary from "../lib/cloudinary.js";



export const getUserTeams = async (req, res) => {
    try {

        const userId = req.user._id;

        const projects = await Project.find({
            $or: [
                { adminId: userId },
                { "team.userId": userId }
            ]
        });

        res.status(200).json({
            success: true,
            message: "Projects fetched successfully",
            count: projects.length,
            data: projects
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch user projects",
            error: err.message
        });
    }
};


// Send Message
export const sendMessage = async (req, res) => {
    try {
        let { teamId, message, image } = req.body;   // MUST be let to reassign
        const senderId = req.user._id;

        if (!message && !image) {
            return res.status(400).json({ message: "Message or image is required" });
        }


        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            image = uploadResponse.secure_url;
        }

        // Check Team Exists
        const isTeamExist = await Project.findById(teamId);
        if (!isTeamExist) {
            return res.status(404).json({ message: "Team not found" });
        }

        const newMessage = await Message.create({
            teamId,
            userId: senderId,
            message,
            image
        });

        return res.status(201).json({
            message: "Message sent successfully",
            data: newMessage
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// Get paginated Team Messages
export const getTeamMessages = async (req, res) => {
    try {
        const { teamId } = req.params;

        // Pagination inputs
        let { page = 1, limit = 20 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        const skip = (page - 1) * limit;

        // Get total messages count
        const totalMessages = await Message.countDocuments({ teamId });

        // Fetch messages
        const messages = await Message.find({ teamId })
            .sort({ createdAt: -1 }) // newest first
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(totalMessages / limit),
            hasMore: page * limit < totalMessages,
            data: messages.reverse() // send oldest → newest to UI
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// Delete Message
export const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const userId = req.user._id;

        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        // Only sender can delete
        if (message.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this message" });
        }

        await Message.findByIdAndDelete(messageId);

        return res.status(200).json({ message: "Message deleted successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



// Update / Edit Message
export const updateMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const { message } = req.body;
        const userId = req.user._id;

        const existingMessage = await Message.findById(messageId);
        if (!existingMessage) {
            return res.status(404).json({ message: "Message not found" });
        }

        if (existingMessage.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Not authorized to edit this message" });
        }

        existingMessage.message = message;
        await existingMessage.save();

        return res.status(200).json({
            message: "Message updated successfully",
            data: existingMessage
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

