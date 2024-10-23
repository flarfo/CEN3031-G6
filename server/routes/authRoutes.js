const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


// POST /login route for user login
router.post('/login', authController.loginUser);
router.post('/signup', authController.registerUser)

module.exports = router;
