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
    },
    image_url:{
        type:String
    },
    sent_request:{
        type:Array
    },
    request:{
        type:Array
    },
    listFriend:{
        type:Array
    }
},{timestamps: true});

const User = mongoose.model("User", userSchema);

module.exports = User;