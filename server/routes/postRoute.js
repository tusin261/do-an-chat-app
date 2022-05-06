const express = require('express');
const { verifyToken, verifyTokenAndAuthorization } = require('./verifyToken');
const router = express.Router();
const postController = require('../controllers/postController');
const multer = require('multer');
const path = require('path');
const FileType = require('../constants/fileUpload_contants');
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
function checkFileTypeVideo(file,cb){
    const fileType = /mp3|mp4/;
    function checkMimeTypeVideo(type){
        if(type == FileType.FILE_MP4 || type == FileType.FILE_MP3){
            return true;
        }
        return false;
    }
    const extname = fileType.test(path.extname(file.originalname).toLowerCase());
    if(extname && checkMimeTypeVideo(file.mimetype)){
        return cb(null,true);
    }
    return cb("Error: VideoOnly");
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
const uploadVideo = multer({
    storage,
    limits:{
        fileSize:2000000
    },
    fileFilter(req,file,cb){
        checkFileTypeVideo(file,cb);
    }
});

router.get("/",verifyTokenAndAuthorization,postController.getAllPost);
router.post("/",verifyTokenAndAuthorization,postController.postWithText);
router.post("/image",verifyTokenAndAuthorization,upload.single('image'),postController.postWithImage);
router.post("/video",verifyTokenAndAuthorization,uploadVideo.single('video'),postController.postWithVideo);
router.put("/:id/like",verifyTokenAndAuthorization,postController.setLikePost);
module.exports = router;