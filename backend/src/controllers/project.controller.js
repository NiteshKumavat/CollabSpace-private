//Todo : Get ALL projets of all users
import Profile from "../models/Profile.js";
import Project from "../models/Project.js";

import cloudinary from "../lib/cloudinary.js";


export const getAllProjects = async ( req, res ) => {
    try {

        const user = req.user._id;

        const blockedUsers = await Profile.find( { user }).select( "user" );
        const blockedIds = blockedUsers.map(b => b.user);
        const projects = await Project.find( { user : { $nin : blockedIds } } );
        return res.status(200).json({projects});
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error"});
    }
}
//Todo : Get projects of a particular user
export const getUserProjects = async ( req, res ) => {
    try {
        const userId = req.params.userId;

        const projects = await Project.find({user : userId});
        if (!projects) {
            return res.status(404).json({message : "No projects found for this user"});
        }

        return res.status(200).json({projects});
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error"});
    }
}
//Todo : Create a project
export const createProject = async ( req, res ) => {
    try {
        const information = req.body;
        const admin = req.user._id;

        if (!information.title) {
            return res.status(400).json({message : "Title is required"});
        }

        if(information.image){
            const uploadResponse = await cloudinary.uploader.upload(information.image);
            information.image = uploadResponse.secure_url;
        }

        const newProject = new Project({
            adminId : admin,
            title : information.title,
            description : information.description,
            projectImage : information.image,
            members : information.members,
            skillsRequired : information.skillsRequired,
        });

        if(!newProject){
            return res.status(400).json({message : "Project creation failed"});
        }

        await newProject.save();
        return res.status(201).json({project : newProject});
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error"})
    }
}

//Todo : Update a project

export const updateProject = async ( req, res ) => {
    try {
        const updates = req.body;
        const projectId = req.params.projectId;

        if(updates.projectImage){
            const uploadResponse = await cloudinary.uploader.upload(updates.projectImage);
            updates.projectImage = uploadResponse.secure_url
        };

        const updatedProject = await Project.findByIdAndUpdate(
            projectId, updates, {new : true}
        );

        if(!updatedProject){
            return res.status(400).json({message : "Project update failed"});
        }

        return res.status(200).json({project : updatedProject});
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error"});
    }
}
//Todo : Delete a project

export const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.projectId;

        const project = await Project.findByIdAndDelete(projectId);
        if(!project){
            return res.status(404).json({message : "Project not found"});
        }

        return res.status(200).json({message : "Project deleted successfully"});
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error"});
    }
}

