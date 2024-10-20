const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.route('/')
    .get(eventController.getAllEvents)
    .post(eventController.createNewEvent);
    /*.patch()
    .delete();*/

module.exports = router;