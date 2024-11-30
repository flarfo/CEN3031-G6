const express = require('express');
const Poll = require('../models/Poll');

// @desc Get all polls
// @route GET /polls
// @access Private
const getAllPolls = async (req, res) => {
    try {
        const polls = await Poll.find().lean();

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
    const { id, title, text, date, tags } = req.body;

    // Confirm that data is valid
    // if (!id || !title || !text || !date) {
    if (id === undefined || !title || !text || !date) {
        return res.status(400).json({ message: 'ID, title, text, and date fields are required.' });
    }

    try {
        // Check for duplicate poll by title
        const duplicate = await Poll.exists({ title });

        if (duplicate) {
            return res.status(409).json({ message: 'Duplicate poll.' });
        }

        // Create new poll object (color replaced with tags)
        const pollObject = { id, title, text, date, tags: tags || [] };

        // Create and store the new poll
        const poll = await Poll.create(pollObject);

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
    }
}

module.exports = { getAllPolls, createNewPoll };
