const Conversation = require('../models/conversationModel');
const User = require('../models/userModel');
const { v4: uuid } = require('uuid');
const AWS = require('aws-sdk');

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

//Tao hoac get chat 1-1
module.exports.getChat = async (req, res) => {
    //User can lay doan chat
    const { userId } = req.body;

    const isChatExist = await Conversation.find({
        isGroupChat: false,
        $and: [
            { member: { $elemMatch: { $eq: req.user.id } } },
            { member: { $elemMatch: { $eq: userId } } },
        ]
    }).populate('member', "-password").populate('latestMessage');


    isChat = await User.populate(isChatExist, {
        path: "latestMessage.sender_id",
        select: "first_name last_name email image_url",
    });

    if (isChatExist.length > 0) {
        res.status(200).json(isChatExist[0]);
    } else {
        const newConversation = {
            chat_name: "sender",
            isGroupChat: false,
            member: [req.user.id, userId]
        }
        try {
            const createdConversation = await Conversation.create(newConversation);
            const newConversation2 = await Conversation.findOne({ _id: createdConversation._id })
                .populate('member', "-password");

            res.status(200).json(newConversation2);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}

//Get all chat cua 1 user
module.exports.getAllChatOfUser = async (req, res) => {
    try {
        const rs = await Conversation.find({ member: { $elemMatch: { $eq: req.user.id } } })
            .populate('member', '-password')
            .populate('creator', '-password')
            .populate('latestMessage')
            .sort({ updatedAt: -1 });
        const data = await User.populate(rs, {
            path: "latestMessage.sender_id",
            select: "first_name last_name image_url email",
        });
        res.status(200).json(data);

    } catch (error) {
        console.log(error);
    }
}

module.exports.createGroupChat = async (req, res) => {

    const users = JSON.parse(req.body.member);
    users.push(req.user.id);
    try {
        const newGroup = await Conversation.create({
            chat_name: req.body.chat_name,
            member: users,
            isGroupChat: true,
            creator: req.user.id
        });
        const groupChat = await Conversation.findOne({ _id: newGroup._id })
            .populate("member", "-password")
            .populate("creator", "-password");

        res.status(200).json(groupChat);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.renameGroup = async (req, res) => {
    const { conversationId, chat_name } = req.body;

    try {
        const updatedChat = await Conversation.findByIdAndUpdate(conversationId, {
            chat_name
        }, {
            new: true
        }).populate('member', '-password')
            .populate('creator', '-password');

        res.status(200).json(updatedChat);

    } catch (error) {
        res.status(500).json(error);
    }

}

module.exports.addUserToGroup = async (req, res) => {
    const { conversationId } = req.body;
    const users = JSON.parse(req.body.member);
    try {
        const group = await Conversation.findOne({ _id: conversationId });
        const newListMember = [...group.member, ...users];
        const updatedGroup = await Conversation.findByIdAndUpdate(conversationId, {
            member: newListMember
        },
            { new: true }
        ).populate('member', '-password')
            .populate('creator', '-password');
        res.status(200).json(updatedGroup);
    } catch (error) {
        res.status(500).json(error);
    }
}
module.exports.removeUserToGroup = async (req, res) => {
    const { conversationId, userId } = req.body;
    if (userId === req.user.id) {
        try {
            const updatedGroup = await Conversation.findByIdAndUpdate(conversationId, {
                $pull: { member: userId }
            },
                { new: true }
            );
            const newIndexOfCreator = Math.floor(Math.random() * updatedGroup.member.length);
            const updatedGroup1 = await Conversation.findByIdAndUpdate(conversationId, {
                creator: updatedGroup.member[newIndexOfCreator]
            },
                { new: true }
            ).populate('member', '-password')
                .populate('creator', '-password');
            return res.status(200).json(updatedGroup1);
        } catch (error) {
            return res.status(500).json(error);
        }

    } else {
        try {
            const updatedGroup = await Conversation.findByIdAndUpdate(conversationId, {
                $pull: { member: userId }
            },
                { new: true }
            ).populate('member', '-password')
                .populate('creator', '-password');
            return res.status(200).json(updatedGroup);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports.updateImageGroup = async (req, res) => {
    const { conversationId } = req.body;
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
                const updatedGroup = await Conversation.findOneAndUpdate({
                    _id: conversationId
                }, { $set: { group_image: `${CLOUD_FONT_URL}${filePath}` } }, { new: true }
                ).populate('member', '-password')
                    .populate('creator', '-password');
                res.status(200).json(updatedGroup);
            }
        });
    } else {
        return res.status(500).json({ message: "Không có file nào được chọn" });
    }
}