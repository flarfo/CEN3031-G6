const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController');
console.log(pollController); // Check what the output is
// const { authenticateToken } = require('../middleware/jwtMiddleware'); // Import the middleware

router.route('/')
    // .get(authenticateToken, pollController.getAllPolls)
    // .post(authenticateToken, pollController.createNewPoll);
    .get(pollController.getAllPolls)
    .post(pollController.createNewPoll);
    /*.patch()
    .delete();*/

    // Route for voting on a specific poll option
router.route('/:id/vote')
    // .post(authenticateToken, pollController.voteOnPoll);
    .post(pollController.voteOnPoll);

module.exports = router;