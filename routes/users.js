const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');


router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
router.post('/getusers', userController.getById);
router.post('/forgotpassword', userController.forgotpassword);
router.post('/reset/:token', userController.resetpassword);

module.exports = router;