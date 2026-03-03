import Message from "../models/Message.js";
import Project from "../models/Project.js";
import { io } from "../lib/socket.js";
import cloudinary from "../lib/cloudinary.js";

// 1. Get All Teams (For Sidebar)
export const getUserTeams = async (req, res) => {
  try {
    const userId = req.user._id;
    // Find projects where the user is in the team
    const teams = await Project.find({
      "team.userId": userId
    }).select("title description image team");

    // Return in the format your frontend expects { data: [...] }
    res.status(200).json({ data: teams });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// 2. Get Messages for a specific Team
export const getTeamMessages = async (req, res) => {
  try {
    const { teamId } = req.params;

    // Verify user is member
    const project = await Project.findById(teamId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const isMember = project.team.some(m => m.userId.toString() === req.user._id.toString());
    if (!isMember) return res.status(403).json({ message: "Not a member" });

    // Match your Schema: "teamId"
    const messages = await Message.find({ teamId })
      .populate("userId", "fullName profilePicture") // Populate sender info
      .sort({ createdAt: 1 });

    res.status(200).json({ data: messages });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


export const sendMessage = async (req, res) => {
  try {

    const { teamId, message, image } = req.body;
    const userId = req.user._id;


    const project = await Project.findById(teamId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const isMember = project.team.some(m => m.userId.toString() === userId.toString());
    if (!isMember) return res.status(403).json({ message: "Not a member" });
    let newImage = null;

    if(image){
      const upload = await cloudinary.uploader.upload(image);
      newImage = upload.secure_url;
    }

    // Save to DB (Matching your Message.js Schema)
    const newMessage = new Message({
      userId,        // Your schema uses userId
      teamId,        // Your schema uses teamId
      message : message || "",       // Your schema uses message
      image : newImage || null  // Your schema uses image
    });

    await newMessage.save();

    // Populate user details immediately for the UI
    await newMessage.populate("userId", "fullName profilePicture");

    // --- REAL TIME MAGIC ---
    // Emit to the specific Room ID (teamId)
    io.to(teamId).emit("newMessage", newMessage);

    res.status(201).json({ data: newMessage });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Placeholders for routes defined in your frontend but not backend yet
export const updateMessage = async (req, res) => res.status(200).json({ message: "Update TODO" });
export const deleteMessage = async (req, res) => res.status(200).json({ message: "Delete TODO" });
export const getProjectMessages = async (req, res) => res.status(200).json({ message: "Deprecated" });