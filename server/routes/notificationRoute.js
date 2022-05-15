const express = require('express');
const { verifyToken, verifyTokenAndAuthorization } = require('./verifyToken');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post("/notification-group",verifyTokenAndAuthorization,notificationController.createNotificationGroup);
router.post("/notification-friend",verifyTokenAndAuthorization,notificationController.createNotificationFriend);
router.post("/notification-like",verifyTokenAndAuthorization,notificationController.createNotificationLike);

router.get("/",verifyTokenAndAuthorization,notificationController.getAllNotification);


module.exports = router;