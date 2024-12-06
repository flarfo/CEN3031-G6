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
    const { id, title, text, date, tags, author } = req.body;

    // Confirm that data is valid
    // if (!id || !title || !text || !date) {
    if (id === undefined || !title || !text || !date) {
        return res.status(400).json({ message: 'ID, title, text, and date fields are required.' });
    }

    try {
        // Check for duplicate event by title
        const duplicate = await Event.exists({ title });

        if (duplicate) {
            return res.status(409).json({ message: 'Duplicate event.' });
        }

        // Create new event object (color replaced with tags)
        const eventObject = { id, title, text, date, tags: tags || [], author: author || 'Anonymous'};

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

const deleteEvent = async (req, res) => {
    const { id } = req.body;  // Get the event ID from the request body
    // const { id } = req.params;  // Get the event ID from the URL parameters
  
    try {

      // Try to find and delete the event by its ID
      const deletedEvent = await Event.deleteOne({ id: id });
  
      // If no event is found, return a 404
      if (!deletedEvent) {
        return res.status(404).json({ message: 'Event not found' });
      }

      const deletedEventObject = deletedEvent.toObject ? deletedEvent.toObject() : deletedEvent;
  
      res.status(200).json({ message: 'Event deleted successfully', event: deletedEventObject });
    } catch (error) {
        console.log(error)
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = { getAllEvents, createNewEvent, deleteEvent };
