const { v4: uuid } = require('uuid');
const AWS = require('aws-sdk');
const user_model = require('../models/userModel');
AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_KEY_ID,
    region: process.env.REGION
});
module.exports.updateAvatar = async (req, res) => {
    const { userId } = req.body;
    if (req.file) {
        const image = req.file.originalname.split('.');
        const fileType = image[image.length - 1];
        const filePath = `${uuid() + Date.now().toString()}.${fileType}`;

        const params = {
            Bucket: "uploads3-chat-app",
            Key: filePath,
            Body: req.file.buffer
        }
        s3.upload(params, (err, data) => {
            if (err) {
                res.status(500).json(error);
            }
            else {
                user_model.findOneAndUpdate({ _id: userId }, { $set: { image_url: `${CLOUD_FONT_URL}${filePath}` } }, (err, data1) => {
                    if (err) {
                        res.status(500).json(error);
                    } else {
                        return res.status(200).json({ message: "Đổi ảnh đại diện thành công" });
                    }
                });
            }
        });

    } else {
        res.send({ tbfile: "Phải chọn ảnh để đổi ảnh đại diện" });
    }
}
module.exports.search = async (req, res) => {
    const keyword = req.query.search;
    const users = await user_model.find({email:keyword});
    console.log(users);
    res.status(200).json(users);
}