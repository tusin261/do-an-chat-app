const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const chatRoute = require('./routes/chatRoute');
const messageRoute = require('./routes/messageRoute');
const PORT = process.env.PORT;
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connect successful');
    }).catch(err => {
        console.log(err);
    });

const server = app.listen(PORT, () => {
    console.log('Server is running ...',);
});
//sau 60s k hoat dong thi dong ket noi
const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    }
});
let users = [];
const addUser = (userId, socketId) => {
    const userOnline = users.filter(u=>u._id == userId);
    if(userOnline){
        users.push({ userId, socketId });
    }
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};
io.on('connection', (socket) => {
    console.log('connected socket io ' + socket.id);
    socket.on('addUser', (data) => {
        addUser(data._id, socket.id);
        io.emit("getUsers", users);
    })
    socket.on('join chat', (room) => { 
        socket.join(room._id);
        console.log("User join " + room._id);
    });
    socket.on('send message',(newMessage)=>{
        if(newMessage.conversation_id.isGroupChat){
            const listReceive = newMessage.conversation_id.member;
            const newListReceiveOnline = users.filter(o1 => listReceive.some(o2 => o1.userId === o2._id));
            const newListReceiveOnlineNoSender = newListReceiveOnline.filter(i=>i.userId !== newMessage.sender_id._id );
            for(let i=0;i<newListReceiveOnlineNoSender.length;i++){
                socket.to(newListReceiveOnlineNoSender[i].socketId).emit("new message group",newMessage);
            }
        }else{
            const mem = newMessage.conversation_id.member;
            const receiver = mem.find(i=>i._id !== newMessage.sender_id._id );
            const userInList = getUser(receiver._id);
            if(userInList){
                socket.to(userInList.socketId).emit("new message",newMessage);
            }
        }
        // const conversationId = newMessage.conversation_id._id;
        // socket.to(conversationId).emit("new message",newMessage);
    })
    
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
      });

})