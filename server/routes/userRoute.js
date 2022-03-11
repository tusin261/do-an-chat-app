const express = require('express');
const { verifyToken, verifyTokenAndAuthorization } = require('./verifyToken');
const router = express.Router();
const userController = require('../controllers/userController');
router.get("/hello",verifyTokenAndAuthorization,userController.test);

module.exports = router;