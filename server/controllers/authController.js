const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
module.exports.register = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    const newUser = new userModel({
        first_name,
        last_name,
        email,
        password
    });

    function sendEmailAuth(email, userId) {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL,
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
            html: `'<a style="font-family:' + "Ubuntu Mono" + ', monospace; display:inline-block; color:#ffffff; background-color:forestgreen; font-size:14px; font-weight:bold; text-decoration:none; padding-left:20px; padding-right:20px; padding-top:20px; padding-bottom:20px;" href="http://localhost:3000/confirm-email/${userId}">Verify E-mail Address</a>'`
        }
        transporter.on("token", (token) => {
            console.log("A new access token was generated");
            console.log("User: %s", token.user);
            console.log("Access Token: %s", token.accessToken);
            console.log("Expires: %s", new Date(token.expires));
        });
        transporter.sendMail(mailOption, (err, info) => {
            if (err) console.log(err);
            else {
                console.log('Email sent ' + info.response);
            }
        });
    }


    try {
        const savedUser = await newUser.save();
        sendEmailAuth(savedUser.email, savedUser._id);
        return res.status(201).json(savedUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email, password });
        if (!user) {
            return res.status(500).json("User khong ton tai");
        } else {
            if (user.isVerified) {
                const accessToken = jwt.sign({
                    id: user._id,
                    isAdmin: user.isAdmin
                }, process.env.SECRET, { expiresIn: "1d" });
                const { password, ...rest } = user._doc;
                return res.status(200).json({ ...rest, accessToken });
            } else {
                res.status(500).json(error);
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.confirm = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await userModel.findOneAndUpdate({ _id: userId }, { isVerified: true }, {
            new: true
        });
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ message: "User không tồn tại", code: -1 });
    }
}