const express = require('express');
const { verifyToken, verifyTokenAndAuthorization } = require('./verifyToken');
const router = express.Router();
const messageController = require('../controllers/messageController');
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

router.post("/",verifyTokenAndAuthorization,messageController.sendMessage);
router.post("/image",verifyTokenAndAuthorization,upload.single('image'),messageController.sendMessageImage);
router.get("/:conversationId",verifyTokenAndAuthorization,messageController.getAllMessage);

module.exports = router;