const express = require('express');
const {signup, login, validateSession, logout, updateUser} = require('../controllers/authController');
const router = express.Router();

router.get('/validate-session', validateSession);
router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);
router.put('/update', updateUser); 

module.exports = router;
