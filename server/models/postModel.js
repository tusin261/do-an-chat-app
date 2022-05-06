const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        userId:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
        desc:{type:String},
        content:{type:String},
        likes:[{type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        type:{type:String},
    },
    { timestamps: true }
)

const Post = mongoose.model("Post", postSchema);
module.exports = Post;