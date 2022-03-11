const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');

const PORT = process.env.PORT;
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);
mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('Connect successful');
    }).catch(err=>{
        console.log(err);
    });

app.listen(PORT,()=>{
    console.log('Server is running ...',);
})