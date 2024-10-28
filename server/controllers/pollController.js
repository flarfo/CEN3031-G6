const express = require('express');
const Poll = require('../models/Poll');

// @desc Get all polls
// @route GET /polls
// @access Private
const getAllPolls = async (req, res) => {
    const polls = await Poll.find().lean();

    if (!polls?.length) {
        // if no polls exist, return JSON with bad request message
        return res.status(400).json({ message: 'No polls found.' });
    }

    // return found polls
    res.json(polls);
}

// @desc Create new poll
// @route POST /polls
// @access Private
const createNewPoll = async (req, res) => {
    const { id, question, options, date, color } = req.body;

    // Confirm that data is valid
    if (!id || !question || !options || !date) {
        // if missing required information, return JSON with bad request message
        return res.status(400).json({ message: 'ID, question, options, and date fields are required.' });
    }

    // Check for duplicate information
    const duplicate = await Poll.findOne({ question }).lean().exec();
    
    if (duplicate) {
        // if duplicate, return JSON with conflict message
        return res.status(409).json({ message: 'Duplicate poll.' });
    }
    
    const pollObject = { id, question, options, date, color };
    // Create and store the new poll
    const poll = await Poll.create(pollObject);
    
    if (poll) {
        res.status(201).json({ message: `New poll '${question}' created.` });
    }
    else {
        res.status(400).json({ message: 'Invalid poll data received.' });
    }
}

module.exports = { getAllPolls, createNewPoll };