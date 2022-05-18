const { v4: uuid } = require('uuid');
const AWS = require('aws-sdk');
const Post = require('../models/postModel');
const user_model = require("../models/userModel");

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_KEY_ID,
    region: process.env.REGION
});
const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_KEY_ID
});
const CLOUD_FONT_URL = 'https://d3pgq3xdjygd77.cloudfront.net/';

module.exports.getAllPost = async (req, res) => {
    const page = req.query.page;
    try {
        const currentUser = await user_model.findById(req.user.id);
        const listFriend = [...currentUser.listFriend,req.user.id];
        const total = await Post.find({userId:{$in:listFriend}}).length;
        const listPost = await Post.find({userId:{$in:listFriend}}).populate('userId')
        .populate('likes').sort({createdAt:-1}).skip(page*10).limit(10);
        const result = {
            total,
            list:listPost
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports.setLikePost = async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.user.id)){
            const updatedPost = await Post.findOneAndUpdate({_id:req.params.id},{$push:{likes:req.user.id}});
            return res.status(200).json(updatedPost);
        }else{
            const updatedPost = await Post.findOneAndUpdate({_id:req.params.id},{$pull:{likes:req.user.id}});
            return res.status(200).json(updatedPost);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports.postWithText = async (req, res) => {
    const { desc } = req.body;
    try {
        const newPost = await Post.create({
            userId: req.user.id,
            desc
        })
        const post = await Post.findOne({ _id: newPost._id }).populate('userId');
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json(error);
    }
}
module.exports.postWithImage = async (req, res) => {
    const { desc } = req.body;
    if (req.file) {
        const image = req.file.originalname.split('.');
        const fileType = image[image.length - 1];
        const filePath = `${uuid() + Date.now().toString()}.${fileType}`;
        const params = {
            Bucket: "uploads3-chat-app",
            Key: filePath,
            Body: req.file.buffer
        }
        s3.upload(params, async (err, data) => {
            if (err) {
                res.status(500).json({message:"Vui lòng thử lại sau"});
            } else {
                const newPost = {
                    userId: req.user.id,
                    desc,
                    content: `${CLOUD_FONT_URL}${filePath}`,
                    type:'image'
                }
                try {
                    const post = await Post.create(newPost);
                    const postRes = await Post.findOne({ _id: post._id }).populate('userId');
                    return res.status(200).json(postRes);
                } catch (error) {
                    res.status(500).json({message:"Kích cỡ file phải ít hơn 2MB"});
                }
            }
        })
    }
}

module.exports.postWithVideo = async (req, res) => {
    const { desc } = req.body;
    if (req.file) {
        const video = req.file.originalname.split('.');
        const fileType = video[video.length - 1];
        const filePath = `${uuid() + Date.now().toString()}.${fileType}`;
        const params = {
            Bucket: "uploads3-chat-app",
            Key: filePath,
            Body: req.file.buffer
        }
        s3.upload(params, async (err, data) => {
            if (err) {
                res.status(500).json(error);
            } else {
                const newPost = {
                    userId: req.user.id,
                    desc,
                    content: `${CLOUD_FONT_URL}${filePath}`,
                    type:'video'
                }
                try {
                    const post = await Post.create(newPost);
                    const postRes = await Post.findOne({ _id: post._id }).populate('userId');
                    return res.status(200).json(postRes);
                } catch (error) {
                    res.status(500).json(error);
                }
            }
        })
    }
}