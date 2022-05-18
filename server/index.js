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
const notificationRoute = require('./routes/notificationRoute');
const postRoute = require('./routes/postRoute');
const adminRoute = require('./routes/adminRoute');
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
app.use('/api/notifications',notificationRoute);
app.use('/api/posts',postRoute);
app.use('/api/admin',adminRoute);
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
    pingTimeout:1200000,
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
    });
    socket.on('send notification',(newMessage)=>{
        if(newMessage.conversation_id.isGroupChat){
            const listReceive = newMessage.conversation_id.member;
            const newListReceiveOnline = users.filter(o1 => listReceive.some(o2 => o1.userId === o2._id));
            const newListReceiveOnlineNoSender = newListReceiveOnline.filter(i=>i.userId !== newMessage.sender_id._id );
            for(let i=0;i<newListReceiveOnlineNoSender.length;i++){
                socket.to(newListReceiveOnlineNoSender[i].socketId).emit("new message group",newMessage);
            }
        }
    })

    socket.on('send notification delete member',({data,member})=>{
        if(data.conversation_id.isGroupChat){
            const listReceive = data.conversation_id.member;
            const newListReceiveOnline = users.filter(o1 => listReceive.some(o2 => o1.userId === o2._id));
            const newListReceiveOnlineNoSender = newListReceiveOnline.filter(i=>i.userId !== data.sender_id._id );
            for(let i=0;i<newListReceiveOnlineNoSender.length;i++){
                socket.to(newListReceiveOnlineNoSender[i].socketId).emit("new message group",data);
            }
            const isOnline = users.find((e)=>e.userId == member._id);
            if(isOnline){
                socket.to(getUser(member._id).socketId).emit("new message mem out group",data);
            }
        }
    })

    socket.on('send notification out group',({data,member})=>{
        if(data.conversation_id.isGroupChat){
            const listReceive = data.conversation_id.member;
            const newListReceiveOnline = users.filter(o1 => listReceive.some(o2 => o1.userId === o2._id));
            const newListReceiveOnlineNoSender = newListReceiveOnline.filter(i=>i.userId !== data.sender_id._id );
            for(let i=0;i<newListReceiveOnlineNoSender.length;i++){
                socket.to(newListReceiveOnlineNoSender[i].socketId).emit("new message group",data);
            }
        }
    })
    socket.on('create group',(data)=>{
        const listReceive = data.member;
        const newListReceiveOnline = users.filter(o1 => listReceive.some(o2 => o1.userId === o2._id));
        const newListReceiveOnlineNoSender = newListReceiveOnline.filter(i=>i.userId !== data.creator._id );
        for(let i=0;i<newListReceiveOnlineNoSender.length;i++){
            socket.to(newListReceiveOnlineNoSender[i].socketId).emit("notification new group",data);
        }
    })
    socket.on('add friend',({receiverId,data})=>{
        const isOnline = users.find((e)=>e.userId == receiverId);
        if(isOnline){
            socket.to(getUser(receiverId).socketId).emit("new request friend",data);
        }
    });
    socket.on('accept friend',({ receiverId, data })=>{
        const isOnline = users.find((e)=>e.userId == receiverId);
        if(isOnline){
            socket.to(getUser(receiverId).socketId).emit("new request accept friend",data);
        }
    });
    socket.on('like',({ receiverId, data })=>{
        const isOnline = users.find((e)=>e.userId == receiverId);
        console.log(data);
        if(isOnline){
            socket.to(getUser(receiverId).socketId).emit("new noti like",data);
        }
    })

    socket.on('out group',(conversation)=>{
        const listReceive = conversation.data.member;
        const newListReceiveOnline = users.filter(o1 => listReceive.some(o2 => o1.userId === o2._id));
        for(let i=0;i<newListReceiveOnline.length;i++){
            socket.to(newListReceiveOnline[i].socketId).emit("notification out group",conversation);
        }
        //example data
        // {
        //     data: {
        //       _id: '62519548b4d8c50d6999a79b',
        //       chat_name: 'test',
        //       isGroupChat: true,
        //       member: [ [Object] ],
        //       creator: {
        //         _id: '622b1fc37035dfc30dc53c34',
        //         first_name: 'ji',
        //         last_name: 'ji',
        //         email: 'loltv156+4@gmail.com',
        //         isAdmin: false,
        //         image_url: 'https://d3pgq3xdjygd77.cloudfront.net/e999c6ba-346a-4c35-82d9-afadf9fb0fec1649476317425.jpg',
        //         sent_request: [],
        //         request: [],
        //         listFriend: [],
        //         createdAt: '2022-03-11T10:09:07.585Z',
        //         updatedAt: '2022-04-09T03:51:57.854Z',
        //         __v: 0
        //       },
        //       createdAt: '2022-04-09T14:16:40.166Z',
        //       updatedAt: '2022-04-09T15:19:18.701Z',
        //       __v: 0
        //     },
        //     name: 'av'
        //   }
    });

    // socket.on('callUser',(data)=>{
    //     const receiver = data.userToCall._id;
    //     socket.to(getUser(receiver).socketId).emit('call',{signal:data.signalData,from:data.from})
    // });
    // socket.on('acceptCall',(data)=>{
    //     const receiver = data.to._id;
    //     socket.to(getUser(receiver).socketId).emit('callAccepted', data.signal);
    // })
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
      });
})