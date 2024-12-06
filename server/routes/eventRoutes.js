const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.route('/')
    .get(eventController.getAllEvents)
    .post(eventController.createNewEvent)
    .delete(eventController.deleteEvent);
    /*.patch()*/
    

module.exports = router;