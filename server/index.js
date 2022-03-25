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
app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/chats',chatRoute);
app.use('/api/messages',messageRoute);
mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('Connect successful');
    }).catch(err=>{
        console.log(err);
    });

const server = app.listen(PORT,()=>{
    console.log('Server is running ...',);
});
//sau 60s k hoat dong thi dong ket noi
const io = require('socket.io')(server,{
    pingTimeout: 60000,
    cors:{
        origin:"http://localhost:3000",
    }
});
io.on('connection',(socket)=>{
    console.log('connected socket io ' +socket.id);
})