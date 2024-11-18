const express = require('express');
const Event = require('../models/Event');

// @desc Get all events
// @route GET /events
// @access Private
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().lean();

        if (!events?.length) {
            return res.status(400).json({ message: 'No events found.' });
        }

        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching events.' });
    }
}

// @desc Create new event
// @route POST /events
// @access Private
const createNewEvent = async (req, res) => {
    const { id, title, text, date, tags } = req.body;

    // Confirm that data is valid
    if (!id || !title || !text || !date) {
        return res.status(400).json({ message: 'ID, title, text, and date fields are required.' });
    }

    try {
        // Check for duplicate event by title
        const duplicate = await Event.exists({ title });

        if (duplicate) {
            return res.status(409).json({ message: 'Duplicate event.' });
        }

        // Create new event object (color replaced with tags)
        const eventObject = { id, title, text, date, tags: tags || [] };

        // Create and store the new event
        const event = await Event.create(eventObject);

        if (event) {
            res.status(201).json({
                message: `New event '${title}' created.`,
                event: event // Return the created event (excluding sensitive fields if needed)
            });
        } else {
            res.status(400).json({ message: 'Invalid event data received.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while creating event.' });
    }
}

module.exports = { getAllEvents, createNewEvent };
