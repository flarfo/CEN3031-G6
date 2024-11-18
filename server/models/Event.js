const mongoose = require('mongoose');
const { format } = require('date-fns');

const eventSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true // Ensure the event ID is unique
    },
    title: {
        type: String,
        required: true,
        maxlength: 200 // Optional: limit title length to prevent too long titles
    },
    text: {
        type: String,
        required: true,
        maxlength: 5000 // Optional: limit the body text for better control
    },
    date: {
        type: Date, // Changed to Date type for easier date operations
        required: true,
        default: Date.now // Optional: default to the current date if not provided
    },
    tags: {
        type: [String], // An array of tags (could be a list of categories/keywords)
        required: false,
        default: [] // Optional: default to an empty array if no tags are specified
    }
});

// Optional: Add a method to format the date in a specific way
eventSchema.methods.formatDate = function () {
    return format(this.date, 'yyyy-MM-dd HH:mm:ss'); // Example format
};

module.exports = mongoose.model('Event', eventSchema);
