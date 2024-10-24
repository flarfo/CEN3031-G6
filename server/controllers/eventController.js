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
    const { id, title, text, date, color } = req.body;

    // Confirm that data is valid
    if (!id || !title || !text || !date) {
        // if missing required information, return JSON with bad request message
        return res.status(400).json({ message: 'ID, title, text, and date fields are required.' });
    }

    // Check for duplicate information
    const duplicate = await Event.findOne({ title }).lean().exec();
    
    if (duplicate) {
        // if duplicate, return JSON with conflict message
        return res.status(409).json({ message: 'Duplicate event.' });
    }
    
    const eventObject = { id, title, text, date, color };
    // Create and store the new event
    const event = await Event.create(eventObject);
    
    if (event) {
        res.status(201).json({ message: `New event '${title}' created.` });
    }
    else {
        res.status(400).json({ message: 'Invalid event data received.' });
    }
}

module.exports = { getAllEvents, createNewEvent };