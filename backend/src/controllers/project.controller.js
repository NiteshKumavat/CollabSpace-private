import Profile from "../models/Profile.js";
import Project from "../models/Project.js";
import cloudinary from "../lib/cloudinary.js";


export const getAllProjects = async (req, res) => {
  try {
    const viewerId = req.user._id;

    const viewerProfile = await Profile.findOne({ user: viewerId }).select("blockList");
    const blockedUsers = viewerProfile?.blockList || [];


    const blockedByUsers = await Profile.find({
      blockList: viewerId
    }).select("user");

    const usersWhoBlockedMe = blockedByUsers.map(u => u.user.toString());

    const excludedUsers = [...blockedUsers.map(u => u.toString()), ...usersWhoBlockedMe];

    const projects = await Project.find({
      adminId: { $nin: excludedUsers }
    }).populate("adminId", "fullName userName profilePicture");


    const filteredProjects = projects.filter(project => 
      project.adminId._id.toString() !== viewerId.toString()
    );

    return res.status(200).json({ filteredProjects });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getUserProjects = async (req, res) => {
  try {
    const userId = req.params.userId;

    const projects = await Project.find({ adminId: userId });

    return res.status(200).json({ projects });

  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const createProject = async (req, res) => {
  try {
    const { title, description, skills } = req.body;
    const adminId = req.user._id;

    if (!title) return res.status(400).json({ message: "Title is required" });

    let imageUrl = null;
    if (req.body.image) {
      const upload = await cloudinary.uploader.upload(req.body.image);
      imageUrl = upload.secure_url;
    }

    const project = await Project.create({
      adminId,
      title,
      description,
      skills,
      projectImage: imageUrl,
      team: [{ userId: adminId, name: req.user.fullName }],
    });

    return res.status(201).json({ project });

  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const updateProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const adminId = req.user._id;

    const project = await Project.findById(projectId);

    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.adminId.toString() !== adminId.toString())
      return res.status(403).json({ message: "Only admin can update project" });

    if (req.body.image) {
      const upload = await cloudinary.uploader.upload(req.body.image);
      req.body.image = upload.secure_url;
    }

    const updatedProject = await Project.findByIdAndUpdate(projectId, req.body, { new: true });
    await updatedProject.save();

    return res.status(200).json({ project: updatedProject });

  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const userId = req.user._id;

    const project = await Project.findById(projectId);

    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.adminId.toString() !== userId.toString())
      return res.status(403).json({ message: "You are not allowed to delete this project" });

    await project.deleteOne();

    return res.status(200).json({ message: "Project deleted successfully" });

  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



export const requestToJoin = async (req, res) => {
  console.log("Hello");
  try {
    const projectId = req.params.projectId;
    console.log("Project ID:", projectId);
    const userId = req.user._id;

    const project = await Project.findById(projectId);
    console.log("Project:", project);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const alreadyMember = project.team.some(member => member.userId.toString() === userId.toString());
    const alreadyRequested = project.requests.some(req => req.userId.toString() === userId.toString());

    if (alreadyMember) return res.status(400).json({ message: "You are already a member" });
    if (alreadyRequested) return res.status(400).json({ message: "Request already sent" });

    project.requests.push({
      userId,
      name: req.user.fullName,
    });

    await project.save();

    return res.status(200).json({ message: "Request sent successfully" });

  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



// 👉 Accept Request (Admin Only)
export const acceptRequest = async (req, res) => {
  try {
    const { projectId, requestUserId } = req.params;
    const adminId = req.user._id;

    const project = await Project.findById(projectId);

    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.adminId.toString() !== adminId.toString())
      return res.status(403).json({ message: "Only admin can accept requests" });

    const request = project.requests.find(r => r.userId.toString() === requestUserId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    project.team.push(request);
    project.requests = project.requests.filter(r => r.userId.toString() !== requestUserId);

    await project.save();

    return res.status(200).json({ message: "Member added", project });

  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};




export const rejectRequest = async (req, res) => {
  try {
    const { projectId, requestUserId } = req.params;
    const adminId = req.user._id;

    const project = await Project.findById(projectId);

    if (project.adminId.toString() !== adminId.toString())
      return res.status(403).json({ message: "Only admin can reject requests" });

    project.requests = project.requests.filter(r => r.userId.toString() !== requestUserId);

    await project.save();

    return res.status(200).json({ message: "Request rejected" });

  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
