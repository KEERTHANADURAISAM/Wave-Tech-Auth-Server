const express = require('express');
const { userRegister, userLogin } = require('../Controller/authController');
const router = express.Router();

// Register route
router.post('/register', userRegister);
router.post('/login',userLogin);
  

module.exports = router;
