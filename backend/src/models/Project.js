import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    adminId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },

    title : {
        type : String,
        required : true
    },

    description : {
        type : String,
    },

    projectImage : {
        type : String,
    },

    members : [{
        type : String,
    }],

    skillsRequired : [{
        type : String
    }],

    isCompleted : {
        type : Boolean
    },

}, {timestamps : true});

const Project = mongoose.model("Project", ProjectSchema);
export default Project;