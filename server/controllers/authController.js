const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');    
const nodemailer = require('nodemailer');
module.exports.register = async (req,res) =>{
    const {first_name,last_name,email,password} = req.body;
    
    const newUser = new userModel({
        first_name,
        last_name,
        email,
        password
    });

    function sendEmailAuth(email){
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: process.env.EMAIL,
              pass: process.env.PASS,
              clientId: process.env.OAUTH_CLIENTID,
              clientSecret: process.env.OAUTH_CLIENT_SECRET,
              refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            },
        });
        const mailOption = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: 'Xác minh email',
            text: 'Xác minh email',
            html: '<a style="font-family:'+"Ubuntu Mono"+', monospace; display:inline-block; color:#ffffff; background-color:forestgreen; font-size:14px; font-weight:bold; text-decoration:none; padding-left:20px; padding-right:20px; padding-top:20px; padding-bottom:20px;" href="https://cnm-chat-app.herokuapp.com/auth/complete-register/">Verify E-mail Address</a>'    
        }
        transporter.sendMail(mailOption, (err, info) => {
            if (err) console.log(err);
            else {
                console.log('Email sent ' + info.response);
            }
        });
    }


    try {
        const savedUser = await newUser.save();
        sendEmailAuth(savedUser.email);
        return res.status(201).json(savedUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

module.exports.login = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email,password});
        if(!user){
            return res.status(500).json("User khong ton tai");
        }else{
            const accessToken = jwt.sign({
                id:user._id,
                isAdmin:user.isAdmin
            },process.env.SECRET,{expiresIn:"1d"});

            const {password,...rest}=user._doc; 
            return res.status(200).json({...rest,accessToken});
        }
    } catch (error) {
        res.status(500).json(error);
    }
}