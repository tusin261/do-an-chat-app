const Message = require('../models/messageModel');
const User = require('../models/userModel');
const Conversation = require('../models/conversationModel');
module.exports.sendMessage = async (req,res)=>{
    const {content,conversation_id,type} = req.body;

    const newMessage = {
        sender_id:req.user.id,
        content,
        type,
        conversation_id
    }

    try {
        const messageQuery = await Message.create(newMessage);
        const messageDoc1 = await messageQuery.populate('sender_id',"first_name last_name image_url");
        const messageDoc2 = await messageDoc1.populate("conversation_id");
        const message = await User.populate(messageDoc2,{
            path:"conversation_id.member",
            select:"first_name last_name image_url email"
        });
        await Conversation.findByIdAndUpdate(req.body.conversation_id,{
            latestMessage:message,
        });
        res.json(message); 
    } catch (error) {
        console.log(error);
    }
}