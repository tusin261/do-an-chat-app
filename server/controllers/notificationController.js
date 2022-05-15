const Notification = require('../models/notificationModel');
const NotificationType = require('../constants/notification_contants');
const Post = require('../models/postModel');

module.exports.createNotificationGroup = async (req, res) => {
    const { type, group} = req.body;
    //const receiverId = JSON.parse(req.body.receiverId);
    let content = '';
    // switch (type) {
    //     case 'add_group':
    //         content = `${NotificationType.ADD_GROUP} ${group.chat_name}`;
    //         break;
    //     default:
    //         break;
    // }
    if(type == 'add_group'){
        content = `${NotificationType.ADD_GROUP} ${group.chat_name}`;
    }

    try {
        const member = group.member.filter(i => i._id != req.user.id);
        const newNotification = await Notification.create({
            sender_id: req.user.id,
            type,
            receiver: member,
            content
        });

        const notification = await Notification.findOne({ _id: newNotification._id })
            .populate("receiver").populate("sender_id");
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.createNotificationFriend = async (req, res) => {
    const { receiver_id, type } = req.body;
    let content = '';
    let receiver = [receiver_id];
    if (type == 'add_friend') {
        content = 'đã gửi lời mời kết bạn';
    } else {
        content = 'đã chấp nhận kết bạn';
    }
    try {
        const newNotification = await Notification.create({
            sender_id: req.user.id,
            type,
            receiver,
            content
        });
        const notification = await Notification.findOne({ _id: newNotification._id })
            .populate("receiver").populate("sender_id");
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.createNotificationLike = async (req,res)=>{
    const {receiver_id,type,postId} = req.body;
    console.log(receiver_id);
    try {
        const post = await Post.findById(postId);
        const newNotification = await Notification.create({
            sender_id: req.user.id,
            type,
            receiver:[receiver_id],
            content:`đã thích bài viết của bạn: ${post.desc}`
        });
        const notification = await Notification.findOne({ _id: newNotification._id })
            .populate("receiver").populate("sender_id");
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json(error);
    }
} 

module.exports.getAllNotification = async (req, res) => {
    try {
        const listNotification = await Notification.find({ receiver: { $in: [req.user.id] } })
            .populate("receiver").populate("sender_id")
            .sort({ createdAt: -1 }).limit(10);
        res.status(200).json(listNotification);
    } catch (error) {
        res.status(500).json(error);
    }
}