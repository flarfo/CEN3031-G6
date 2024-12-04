const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

router.route('/')
    .get(calendarController.getAllEvents)
    .post(calendarController.createNewEvent);
    /*.patch()
    .delete();*/

module.exports = router;