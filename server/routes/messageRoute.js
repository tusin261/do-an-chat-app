const express = require('express');
const { verifyToken, verifyTokenAndAuthorization } = require('./verifyToken');
const router = express.Router();
const messageController = require('../controllers/messageController');
const multer = require('multer');
const converFormToJson = multer();
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

function checkFileTypeNotImame(file,cb){
    const fileType = /doc|docx|pdf|xls|xlsx|txt|zip/;
    function checkMimeTypeFile(type){
        if(type == FileType.FILE_DOCX || type ==FileType.FILE_DOC || type ==FileType.FILE_PDF || 
            type == FileType.FILE_XLS || type ==FileType.FILE_XLSX || type ==FileType.FILE_TXT || 
            type ==FileType.FILE_ZIP){
                return true;
            }
        return false;
    }
    const extname = fileType.test(path.extname(file.originalname).toLowerCase());

    if(extname && checkMimeTypeFile(file.mimetype)){
        return cb(null,true);
    }
    return cb("Error: fileOnly");
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

const uploadFile = multer({
    storage,
    limits:{
        fileSize:2000000
    },
    fileFilter(req,file,cb){
        checkFileTypeNotImame(file,cb);
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


router.post("/",verifyTokenAndAuthorization,messageController.sendMessage);
router.post("/notification",verifyTokenAndAuthorization,messageController.sendMessageNotification);
router.post("/image",verifyTokenAndAuthorization,upload.single('image'),messageController.sendMessageImage);
router.post("/file",verifyTokenAndAuthorization,uploadFile.single('anotherFile'),messageController.sendMessageFile);
router.post("/video",verifyTokenAndAuthorization,uploadVideo.single('video'),messageController.sendMessageImageVideo);
router.post("/update-message",verifyTokenAndAuthorization,messageController.updateMessage);
router.get("/:conversationId",verifyTokenAndAuthorization,messageController.getAllMessage);

module.exports = router;