const express = require('express');
const Event = require('../models/Event');

// @desc Get all events
// @route GET /events
// @access Private
const getAllEvents = async (req, res) => {
    const events = await Event.find().lean();

    if (!events?.length) {
        // if no events exist, return JSON with bad request message
        return res.status(400).json({ message: 'No events found.' });
    }

    // return found events
    res.json(events);
}

// @desc Create new event
// @route POST /events
// @access Private
const createNewEvent = async (req, res) => {
    const { name, textContent, link } = req.body;

    // Confirm that data is valid
    if (!name || !textContent) {
        // if missing required information, return JSON with bad request message
        return res.status(400).json({ message: 'Name and text fields are required.' });
    }

    // Check for duplicate information
    const duplicate = await Event.findOne({ name }).lean().exec();

    if (duplicate) {
        // if duplicate, return JSON with conflict message
        return res.status(409).json({ message: 'Duplicate event.' });
    }

    const eventObject = { name, textContent, link };

    // Create and store the new event
    const event = await Event.create(eventObject);

    if (event) {
        res.status(201).json({ message: `New event '${name}' created.` });
    }
    else {
        res.status(400).json({ message: 'Invalid event data received.' });
    }
}

module.exports = { getAllEvents, createNewEvent };