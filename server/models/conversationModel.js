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
}, { timestamps: true });

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;