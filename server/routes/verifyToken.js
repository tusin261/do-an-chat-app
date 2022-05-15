const jwt = require('jsonwebtoken');    

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.SECRET,(err,user)=>{
            if(err){
                return res.status(403).json("Token not valid");
            }
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("You are not auth");

    }
}
const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id){
            next();
        }else{
            return res.status(403).json("You are not allow to do that");
        }
    });
}
const verifyTokenAndAuthorizationAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id && req.user.isAdmin){
            next();
        }else{
            return res.status(403).json("You are not allow to do that");
        }
    });
}

module.exports = {verifyToken, verifyTokenAndAuthorization,verifyTokenAndAuthorizationAdmin};