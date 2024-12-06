const express = require('express');
const Calendar = require('../models/Calendar');

// @desc Get all calendar events
// @route GET /calendar
// @access Private
const getAllEvents = async (req, res) => {
    try {
        const events = await Calendar.find().lean();

        if (!events?.length) {
            return res.status(400).json({ message: 'No events found.' });
        }

        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error while fetching events.' });
    }
}

// @desc Create new calendar event
// @route POST /calendar
// @access Private
const createNewEvent = async (req, res) => {
    const { id, start, end, text, backColor } = req.body;

    // Confirm that data is valid
    if (!id || !start || !end || !text || !backColor) {
        return res.status(400).json({ message: 'ID, start, end, text, and color fields are required.' });
    }

    try {
        // Check for duplicate event by title
        /*const duplicate = await Calendar.exists({ text });

        if (duplicate) {
            return res.status(409).json({ message: 'Duplicate event.' });
        }*/

        // Create new event object (color replaced with tags)
        const eventObject = { id, start, end, text, backColor };

        // Create and store the new event
        const event = await Calendar.create(eventObject);
        
        if (event) {
            res.status(201).json({
                message: `New event '${text}' created.`,
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
