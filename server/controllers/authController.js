const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const CryptoJS = require("crypto-js");
module.exports.register = async (req, res) => {
    const { first_name, last_name, email, password, gender } = req.body;
    let curr_gender;
    const en_password = CryptoJS.AES.encrypt(password, process.env.SECRET).toString();
    if (gender == 'nam') {
        curr_gender = false;
    } else {
        curr_gender = true;
    }
    const newUser = new userModel({
        first_name,
        last_name,
        email,
        password: en_password, gender: curr_gender
    });

    function sendEmailAuth(email, userId, name) {
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
            html: `
            <div style="margin:0 auto;max-width:600px;">
                <h3 style="text-align: center;">XÁC THỰC EMAIL</h3>
                <p>Xin chào,<b>${name}</b></p>
                <p>Cảm ơn bạn đã sử dụng zChat, vui lòng nhấn vào link bên dưới để xác thực tài khoản.</p>
                <a style="text-decoration:none" href="http://localhost:3000/confirm-email/${userId}">Xác thực</a>
                </br></br>
                <p>Cám ơn</p>.
                </div>
            `
        }
        // <div style="margin:0 auto;max-width:600px;">
        // 	    <p>Xin chào,${name}</br>
        //         <a href="http://localhost:3000/confirm-email/${userId}"></a>
        //         How are you It's testing mail
        //         </br></br>
        //         Thanks
        //     </div>
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
        const existUser = await userModel.findOne({ email: email });
        if (existUser) {
            return res.status(500).json({ message: "Email đã tồn tại" });
        }
        const savedUser = await newUser.save();
        sendEmailAuth(savedUser.email, savedUser._id, savedUser.first_name);
        return res.status(200).json(savedUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Tạo tài khoản không thành công" });
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    //const en_password = CryptoJS.AES.encrypt(password,process.env.SECRET).toString();
    try {
        const current_user = await userModel.findOne({ email });
        if (!current_user) {
            return res.status(500).json({ message: "Email không tồn tại" });
        } else {
            const bytes = CryptoJS.AES.decrypt(current_user.password, process.env.SECRET);
            const de_password = bytes.toString(CryptoJS.enc.Utf8);
            if (de_password != password) {
                return res.status(500).json({ message: "Sai tài khoản hoặc mật khẩu" });
            } else {
                if (current_user.isVerified) {
                    const accessToken = jwt.sign({
                        id: current_user._id,
                        isAdmin: current_user.isAdmin
                    }, process.env.SECRET, { expiresIn: "1d" });
                    const { password, ...rest } = current_user._doc;
                    return res.status(200).json({ ...rest, accessToken });
                } else {
                    return res.status(500).json({ message: "Tài khoản chưa được xác thực" });
                }
            }
        }
    } catch (error) {
        return res.status(500).json({ message: "Vui lòng thử lại sau" });
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