const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiver: [{type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    type:{type:String},
    content:{type:String},
    isRead:{type:Boolean,default:false}
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;