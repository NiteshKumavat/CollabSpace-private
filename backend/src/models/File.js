import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    fileUrl: { 
        type: String, 
        required: true // The S3 or Cloudinary link
    },
    storageKey: { 
        type: String, 
        required: true // The unique key needed to delete the file from cloud storage
    },
    fileType: { 
        type: String // e.g., 'image/jpeg', 'application/pdf'
    },
    size: { 
        type: Number // Size in bytes
    },
    projectId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Project", 
        required: true 
    },
    folderId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Folder", 
        default: null // null means the file is in the "root" of the project
    },
    uploadedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    }
}, { timestamps: true });

export const File = mongoose.model("File", fileSchema);