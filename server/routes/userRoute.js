const express = require('express');
const { verifyToken, verifyTokenAndAuthorization } = require('./verifyToken');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const converFormToJson = multer();
const path = require('path');
const storage = multer.memoryStorage({
    destination(req,file,callback){
        callback(null,'');
    }
});
function checkFileType(file,cb){
    const fileType = /jpeg|jpg|png|gif/;
    
    const extname = fileType.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileType.test(file.mimetype);
    
    if(extname && mimetype){
        return cb(null,true);
    }
    return cb("Error: imageOnly");
}
const upload = multer({
    storage,
    limits:{
        fileSize:2000000
    },
    fileFilter(req,file,cb){
        checkFileType(file,cb);
    }
});

router.post("/updateAvatar",verifyTokenAndAuthorization,upload.single('image'),userController.updateAvatar);
router.get("/",verifyTokenAndAuthorization,userController.search);
router.get("/getFriend",verifyTokenAndAuthorization,userController.getListFriend);
router.post("/addFriend",verifyTokenAndAuthorization,userController.addFriend);
router.post("/acceptRequest",verifyTokenAndAuthorization,userController.acceptRequest);
router.post("/rejectRequest",verifyTokenAndAuthorization,userController.rejectRequest);
router.post("/updateInfomation",verifyTokenAndAuthorization,userController.updateInformation);

module.exports = router;