const { v4: uuid } = require('uuid');
const AWS = require('aws-sdk');
const user_model = require("../models/userModel");
const jwt = require('jsonwebtoken');    

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_KEY_ID,
    region: process.env.REGION
});
const s3 = new AWS.S3({
    accessKeyId:process.env.ACCESS_KEY_ID,
    secretAccessKey:process.env.SECRET_KEY_ID
});

const CLOUD_FONT_URL = 'https://d3pgq3xdjygd77.cloudfront.net/';
module.exports.updateAvatar = async (req, res) => {
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
                res.status(500).json(error);
            }
            else {
                const user = await user_model.findOne({_id:req.user.id});
                const accessToken = jwt.sign({
                    id:user._id,
                    isAdmin:user.isAdmin
                },process.env.SECRET,{expiresIn:"1d"});
                user_model.findOneAndUpdate({
                    _id: req.user.id
                }, { $set: { image_url: `${CLOUD_FONT_URL}${filePath}` } },{new: true}, (err, data1) => {
                    if (err) {
                        res.status(500).json(error);
                    } else {
                        const {password,...rest}=data1._doc; 
                        return res.status(200).json({...rest,accessToken});
                    }
                });
            }
        });

    } else {
        return res.status(500).json({message:"Không có file nào được chọn"});
    }
}
module.exports.search = async (req, res) => {
    const keyword = req.query.q;
    if(keyword == ''){
        return res.status(200).json([]);
    }
    const users = await user_model.find({ first_name: { $regex: new RegExp('^' + keyword + '.', 'i') } })
        .find({_id:{$ne:req.user.id}}).find({isAdmin:false});
    const result2 = await user_model.find({ first_name:keyword}).find({_id:{$ne:req.user.id}}).find({isAdmin:false});
    if(users.length > 0){
        return res.status(200).json(users);
    }else{
        if(result2.length > 0){
            return res.status(200).json(result2);
        }else{
            return res.status(200).json([]);
        }
    }
   
    
}