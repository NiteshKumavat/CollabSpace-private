import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true 
    },
    projectId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Project", 
        required: true 
    },
    parentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Folder", 
        default: null 
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    }
}, { timestamps: true });


export const Folder = mongoose.model("Folder", folderSchema);