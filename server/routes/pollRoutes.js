const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController');

router.route('/')
    .get(pollController.getAllPolls)
    .post(pollController.createNewPoll);
    /*.patch()
    .delete();*/

module.exports = router;