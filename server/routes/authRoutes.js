const express = require('express');
const {signup, login} = require('../controllers/authController');

const router = express.Router();
// POST /login route for user login
router.post('/login', login);
router.post('/signup', signup);

module.exports = router;
