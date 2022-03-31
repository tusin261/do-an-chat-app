const express = require('express');
const { verifyToken, verifyTokenAndAuthorization } = require('./verifyToken');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post("/",verifyTokenAndAuthorization,messageController.sendMessage);
router.get("/:conversationId",verifyTokenAndAuthorization,messageController.getAllMessage);

module.exports = router;