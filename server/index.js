const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.get("/h",(req,res)=>{
    res.send('HeHel');
})

app.listen(PORT,()=>{
    console.log('Server is running ...');
})