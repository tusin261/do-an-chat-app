const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    chat_name: {
        type: String
    },
    isGroupChat: { type: Boolean, default: false },
    member: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    group_image:{
        type:String,
        default:"https://d3pgq3xdjygd77.cloudfront.net/image_group.jpg"
    }
}, { timestamps: true });

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;