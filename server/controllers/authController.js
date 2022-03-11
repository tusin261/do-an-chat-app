const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');    

module.exports.register = async (req,res) =>{
    const {first_name,last_name,email,password} = req.body;
    
    const newUser = new userModel({
        first_name,
        last_name,
        email,
        password
    });
    try {
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (error) {
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
        console.log(error);
        res.status(500).json(error);
    }
}