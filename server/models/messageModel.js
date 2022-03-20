const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String},
    type:{type:String},
    conversation_id: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],  
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;