const Notification = require('../models/notificationModel');
const NotificationType = require('../constants/notification_contants');

module.exports.createNotificationGroup = async (req, res) => {
    const { type, group,memKick } = req.body;
    //const receiverId = JSON.parse(req.body.receiverId);
    let content = '';
    switch (type) {
        case 'add_group':
             content = `${NotificationType.ADD_GROUP} ${group.chat_name}`;
             break;
        case 'kick_mem':
             content = `${memKick.first_name} ${NotificationType.KICK_MEMBER} ${group.chat_name}`;
             break;
        case 'out_group':
            return content = `${NotificationType.OUT_GROUP} ${group.chat_name}`;
            break;
        case 'change_img':
             content = `${NotificationType.CHANGE_IMG} ${group.chat_name}`;
             break;
        default:
            break;
    }

    try {
        const member = group.member.filter(i=> i._id != req.user.id);
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