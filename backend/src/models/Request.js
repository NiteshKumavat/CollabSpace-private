import mongoose from "mongoose";

const RequestSchema = mongoose.Schema({
    From : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    To : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    project : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },

    message : {
        type : String,
    },

    status : {
        type : String,
        enum : ["Pending", "Accepted", "Rejected"],
        default : "Pending"
    },

    requestedAt: {
        type: Date,
        default: Date.now
    }
});

const Request = mongoose.model("Request", RequestSchema);
export default Request;