const express = require('express');
const { verifyTokenAndAuthorizationAdmin} = require('./verifyToken');
const router = express.Router();    
const userController = require('../controllers/adminController');

router.get("/",verifyTokenAndAuthorizationAdmin,userController.getUser);
router.get("/getUsersByWeek",verifyTokenAndAuthorizationAdmin,userController.getUserByMonth);

router.post("/",verifyTokenAndAuthorizationAdmin,userController.getUserByCondition);
router.post("/",verifyTokenAndAuthorizationAdmin,userController.getUserByCondition);
router.post("/updateUser",verifyTokenAndAuthorizationAdmin,userController.updateUser);


module.exports = router;