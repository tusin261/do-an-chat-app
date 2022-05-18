const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    isVerified:{
        type:Boolean,
        default:false
    },gender:{
        type:Boolean,
        default:false
    },
    image_url:{
        type:String,
        default:"https://d3pgq3xdjygd77.cloudfront.net/user-avatar.png"
    },
    sent_request:[{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    request:[{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    listFriend:[{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
},{timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;