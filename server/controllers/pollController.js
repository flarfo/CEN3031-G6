const express = require('express');
const mongoose = require('mongoose');
const Poll = require('../models/Poll');

// @desc Get all polls
// @route GET /polls
// @access Private
const getAllPolls = async (req, res) => {
    try {
        const polls = await Poll.find().lean();
        // const polls = await polls.find().lean();

        if (!polls?.length) {
            return res.status(400).json({ message: 'No polls found.' });
        }

        res.json(polls);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching polls.' });
    }
}

// @desc Create new poll
// @route POST /polls
// @access Private
const createNewPoll = async (req, res) => {
    const { id, title, options, date, author } = req.body;

    // Confirm that data is valid
    // if (!id || !title || !options || !date) {
    if (id === undefined || !title || !options || !date) {
        return res.status(400).json({ message: 'ID, question, options, and date fields are required.' });
    }

    try {
        // Check for duplicate poll by title
        const duplicate = await Poll.exists({ title });
        // const duplicate = await polls.exists({ title });

        if (duplicate) {
            return res.status(409).json({ message: 'Duplicate poll.' });
        }

        // Create new poll object
        const pollObject = { id, title, date, options: options || [], votes: new Array(options.length).fill(0), voters: [], author: author || 'Anonymous' };

        // Create and store the new poll
        const poll = await Poll.create(pollObject);
        // const poll = await polls.create(pollObject);

        if (poll) {
            res.status(201).json({
                message: `New poll '${title}' created.`,
                poll: poll // Return the created poll (excluding sensitive fields if needed)
            });
        } else {
            res.status(400).json({ message: 'Invalid poll data received.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while creating poll.' });
        toast.error(`Error posting to server1: ${err.message}`);
    }
}


// @desc Vote on a poll option
// @route POST /polls/:id/vote
// @access Private
const voteOnPoll = async (req, res) => {
    const pollId = Number(req.params.id);   // Access poll ID from URL

    // Convert the string to ObjectId manually if needed
    // pollId = mongoose.Types.ObjectId(pollId);

    const { optionIndex, voterId } = req.body;

    console.log(voterId)

    try {
        const poll = await Poll.findOne({ id: pollId });
        // const poll = await polls.findOne({ id: 0 });
       
        if (!poll) {
            console.log(pollId)
            console.log(poll)
            return res.status(404).json({ message: 'Poll not found1.' });
        }

        // Check if the user has already voted
        if (poll.voters.includes(voterId)) {
            console.log(poll)
            return res.status(400).json({ message: 'You have already voted!' });
        }

        // Validate the option index
        if (!poll.options[optionIndex]) {
            console.log(poll)
            return res.status(400).json({ message: 'Invalid option selected!' });
        }

        // Validate the option index
        if (voterId === 'guest') {
            console.log(poll)
            return res.status(400).json({ message: 'Please log in.' });
        }


        // Increment the vote count for the selected option
        // poll.options[optionIndex].votes += 1;

        // if (typeof poll.votes[optionIndex] !== 'number') {
        //     poll.votes[optionIndex] = 0;
        // }
        console.log(optionIndex)
        poll.votes[optionIndex] += 1;

        console.log(poll.votes)
        

        // Add the voter to the list
        poll.voters.push(voterId);

        // Save the updated poll
        await poll.save();

        res.json({ message: 'Vote submitted successfully!', poll });
        console.log(poll)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while submitting vote.' });
    }
}

module.exports = { getAllPolls, createNewPoll, voteOnPoll };

