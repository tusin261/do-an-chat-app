const express = require('express');
const { verifyToken, verifyTokenAndAuthorization } = require('./verifyToken');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post("/",verifyTokenAndAuthorization,chatController.getChat);
router.get("/",verifyTokenAndAuthorization,chatController.getAllChatOfUser);

router.post("/group",verifyTokenAndAuthorization,chatController.createGroupChat);
router.put("/rename-group",verifyTokenAndAuthorization,chatController.renameGroup);
router.put("/add-group",verifyTokenAndAuthorization,chatController.addUserToGroup);
router.put("/remove-group",verifyTokenAndAuthorization,chatController.removeUserToGroup);


module.exports = router;