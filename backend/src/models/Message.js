import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    teamId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Project",
        required : true
    },

    userId : {
        type : mongoose.Schema.type.ObjectId,
        type : "User",
        required : true
    },

    message : {
        type : String,
        required : true
    },

    image : {
        type : String,
    },
}, {timestamps : true});

const Message = mongoose.model("Message", messageSchema);

export default Message;