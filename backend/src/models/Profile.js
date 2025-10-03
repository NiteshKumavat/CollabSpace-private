import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },


    fullName: { type: String, required: true },
    profilePicture: { type: String }, 
    bio: { type: String, maxlength: 500 },
    location: { type: String },

    skills: [{ type: String }],
    experienceLevel: {
        type: String,
        enum: ["Beginner", "Intermediate", "Expert"],
        default: "Beginner"
    },
    rolePreference: { type: String },
    lookingForTeam: { type: Boolean, default: false },
    availableForCollab: { type: Boolean, default: true },

    github: { type: String },
    linkedin: { type: String },
    portfolio: { type: String },
    personalWebsite: { type: String },
});

export default mongoose.model("Profile", ProfileSchema);
