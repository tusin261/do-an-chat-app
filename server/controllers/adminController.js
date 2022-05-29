const user_model = require("../models/userModel");
const jwt = require('jsonwebtoken');

module.exports.getUser = async (req, res) => {
    try {
        const users = await user_model.find({ _id: { $ne: req.user.id } });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports.getUserByCondition = async (req, res) => {
    const { first_name, email } = req.body;
    try {
        if(first_name == '' && email == ''){
            const users = await user_model.find({ _id: { $ne: req.user.id } });
            return res.status(200).json(users);
        }
        else if (first_name == '') {
            const users = await user_model.find({ _id: { $ne: req.user.id } })
                .find({ email: email });
            return res.status(200).json(users);
        } else if (email == '') {
            const users = await user_model.find({ _id: { $ne: req.user.id } })
                .find({ "first_name": { $regex: first_name, "$options": "i" } });
            return res.status(200).json(users);
        } else if (first_name != '' && email != '') {
            const users = await user_model.find({ _id: { $ne: req.user.id } })
                .find({ "first_name": { $regex: first_name, "$options": "i" } })
                .find({ email: email });
            return res.status(200).json(users);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

module.exports.getUserByMonth = async (req, res) => {
    const month = (new Date().getMonth())+1;
    let users = [];
    try {
        const listUser = await user_model.find({ _id: { $ne: req.user.id } });
        for(let i=0;i<listUser.length;i++){
            const d = (new Date(listUser[i].createdAt.toString()).getMonth()) + 1;
            if(month == d){
                users.push(listUser[i]);
            }
        }
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

module.exports.updateUser = async (req,res)=>{
    const {isLock,isDelete,isChange,first_name,last_name,email,userId,verified} = req.body;

    try {
        if(isLock){
            const user = await user_model.findOneAndUpdate({_id:userId},{isVerified:!verified},{new:true});
            return res.status(200).json(user);
        }else if(isDelete){
            const user = await user_model.findOneAndDelete({_id:userId});
            return res.status(200).json(user);
        }else if(isChange){
            const existEmail = await user_model.findOne({ email: email }).findOne({ _id: { $ne: userId } });
            if (existEmail) {
                return res.status(500).json({ message: "Email đã tồn tại", code: 1 });
            }
            const user = await user_model.findOneAndUpdate({_id:userId},{
                $set:{
                    first_name:first_name,
                    last_name:last_name,
                    email:email
                }
            },{new:true});
            return res.status(200).json(user);
        }
    } catch (error) {
        return res.status(500).json({ message: "Vui lòng thử lại sau", code: 0 });
    }
}