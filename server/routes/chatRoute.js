const express = require('express');
const { verifyToken, verifyTokenAndAuthorization } = require('./verifyToken');
const router = express.Router();
const chatController = require('../controllers/chatController');
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

router.post("/",verifyTokenAndAuthorization,chatController.getChat);
router.get("/",verifyTokenAndAuthorization,chatController.getAllChatOfUser);

router.post("/group",verifyTokenAndAuthorization,chatController.createGroupChat);
router.put("/rename-group",verifyTokenAndAuthorization,chatController.renameGroup);
router.put("/add-group",verifyTokenAndAuthorization,chatController.addUserToGroup);
router.put("/remove-group",verifyTokenAndAuthorization,chatController.removeUserToGroup);
router.put("/update-group",verifyTokenAndAuthorization,upload.single('image'),chatController.updateImageGroup);


module.exports = router;