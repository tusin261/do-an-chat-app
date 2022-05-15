const Message = require('../models/messageModel');
const User = require('../models/userModel');
const Conversation = require('../models/conversationModel');
const { v4: uuid } = require('uuid');
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const NotificationType = require('../constants/notification_contants');

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
module.exports.sendMessage = async (req, res) => {
    const { content, conversation_id, type } = req.body;

    const newMessage = {
        sender_id: req.user.id,
        content,
        type,
        conversation_id
    }

    try {
        const messageQuery = await Message.create(newMessage);
        const messageDoc1 = await messageQuery.populate('sender_id', "first_name last_name image_url");
        const messageDoc2 = await messageDoc1.populate("conversation_id");
        const message = await User.populate(messageDoc2, {
            path: "conversation_id.member",
            select: "first_name last_name image_url email"
        });
        await Conversation.findByIdAndUpdate(req.body.conversation_id, {
            latestMessage: message,
        });
        res.json(message);
    } catch (error) {
        console.log(error);
    }
}

module.exports.sendMessageNotification = async (req, res) => {
    const { content, conversation_id, type } = req.body;
    const newMessage = {
        sender_id: req.user.id,
        content,
        type,
        conversation_id
    }
    try {
        const messageQuery = await Message.create(newMessage);
        const messageDoc1 = await messageQuery.populate('sender_id', "first_name last_name image_url");
        const messageDoc2 = await messageDoc1.populate("conversation_id");
        const message = await User.populate(messageDoc2, {
            path: "conversation_id.member",
            select: "first_name last_name image_url email"
        });
        await Conversation.findByIdAndUpdate(req.body.conversation_id, {
            latestMessage: message,
        });
        res.json(message);
    } catch (error) {
        console.log(error);
    }
}

module.exports.sendMessageImageVideo = async (req, res) => {
    const { conversation_id, type } = req.body;
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
                const newMessage = {
                    sender_id: req.user.id,
                    content: `${CLOUD_FONT_URL}${filePath}`,
                    type,
                    conversation_id
                }
                try {
                    const messageQuery = await Message.create(newMessage);
                    const messageDoc1 = await messageQuery.populate('sender_id', "first_name last_name image_url");
                    const messageDoc2 = await messageDoc1.populate("conversation_id");
                    const message = await User.populate(messageDoc2, {
                        path: "conversation_id.member",
                        select: "first_name last_name image_url email"
                    });
                    await Conversation.findByIdAndUpdate(req.body.conversation_id, {
                        latestMessage: message,
                    });
                    res.json(message);
                } catch (error) {
                    console.log(error);
                }
            }
        })
    } else {
        return res.status(500).json({ message: "Không có file nào được chọn" });
    }
}

module.exports.sendMessageImage = async (req, res) => {
    const { conversation_id, type } = req.body;

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
            } else {
                const newMessage = {
                    sender_id: req.user.id,
                    content: `${CLOUD_FONT_URL}${filePath}`,
                    type,
                    conversation_id
                }
                try {
                    const messageQuery = await Message.create(newMessage);
                    const messageDoc1 = await messageQuery.populate('sender_id', "first_name last_name image_url");
                    const messageDoc2 = await messageDoc1.populate("conversation_id");
                    const message = await User.populate(messageDoc2, {
                        path: "conversation_id.member",
                        select: "first_name last_name image_url email"
                    });
                    await Conversation.findByIdAndUpdate(req.body.conversation_id, {
                        latestMessage: message,
                    });
                    res.json(message);
                } catch (error) {
                    console.log(error);
                }
            }
        })
    } else {
        return res.status(500).json({ message: "Không có file nào được chọn" });
    }
}

module.exports.sendMessageFile = async (req, res) => {
    const { conversation_id, type } = req.body;
    if (req.file) {
        const myFile = req.file.originalname.split('.');
        const fileName = myFile[0];
        const fileType = myFile[myFile.length - 1];
        const filePath = `${fileName}-filename-${uuid() + Date.now().toString()}-size-${req.file.size}.${fileType}`;
        const params = {
            Bucket: "uploads3-chat-app",
            Key: filePath,
            Body: req.file.buffer
        }
        s3.upload(params, async (err, data) => {
            if (err) {
                res.status(500).json(error);
            } else {
                const newMessage = {
                    sender_id: req.user.id,
                    content: `${CLOUD_FONT_URL}${filePath}`,
                    type,
                    conversation_id
                }
                try {
                    const messageQuery = await Message.create(newMessage);
                    const messageDoc1 = await messageQuery.populate('sender_id', "first_name last_name image_url");
                    const messageDoc2 = await messageDoc1.populate("conversation_id");
                    const message = await User.populate(messageDoc2, {
                        path: "conversation_id.member",
                        select: "first_name last_name image_url email"
                    });
                    await Conversation.findByIdAndUpdate(req.body.conversation_id, {
                        latestMessage: message,
                    });
                    res.json(message);
                } catch (error) {
                    console.log(error);
                }
            }
        })
    } else {
        return res.status(500).json({ message: "Không có file nào được chọn" });
    }
}

module.exports.getAllMessage = async (req, res) => {
    const page = req.query.page;
    console.log('a');
    try {
        const total = await Message.find({ conversation_id: req.params.conversationId }).length;
        const messages = await Message.find({ conversation_id: req.params.conversationId })
            .populate("sender_id", "first_name last_name image_url email")
            .populate('conversation_id').sort({ createdAt: -1 }).skip(page * 10).limit(10);
        const result = {
            total,
            list: messages
        }
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
        console.log(error.message)
    }
}

module.exports.updateMessage = async (req, res) => {
    const { lastestMessage } = req.body;
    const readedBy = JSON.parse(req.body.readBy);
    try {
        const isExist = await Message.findOne({
            _id: lastestMessage._id, readBy: { $in: [req.user.id] }
        })
        if (!isExist) {
            const messageUpdated = await Message.findOneAndUpdate({ _id: lastestMessage._id }, {
                readBy: readedBy
            }, { new: true }).populate('readBy');
            res.status(200).json(messageUpdated);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}