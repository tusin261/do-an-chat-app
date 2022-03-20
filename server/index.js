const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const chatRoute = require('./routes/chatRoute');
const PORT = process.env.PORT;
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cors());
app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/chats',chatRoute);
mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('Connect successful');
    }).catch(err=>{
        console.log(err);
    });

app.listen(PORT,()=>{
    console.log('Server is running ...',);
})