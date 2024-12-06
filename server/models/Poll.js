const mongoose = require('mongoose');
const { format } = require('date-fns');

const pollSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true // Ensure the poll ID is unique
    },
    title: {
        type: String,
        required: true,
        maxlength: 200 // Optional: limit title length to prevent too long titles
    },
    date: {
        type: Date, // Changed to Date type for easier date operations
        required: true,
        default: Date.now // Optional: default to the current date if not provided
    },
    // options: [
    //     {
    //       text: { type: String, required: true }, // Option text
    //       votes: { type: Number, default: 0 }    // Number of votes
    //     }
    //   ],

    options: [{ type: String, required: true }],   // Option text
    votes: { type: [Number], default: [] },
    voters: { type: [String], default: [] }, // Array of user IDs to track who voted on a poll
    author: {
        type: String,
        required: false,
        maxlength: 200 
    }
});

// Optional: Add a method to format the date in a specific way
pollSchema.methods.formatDate = function () {
    return format(this.date, 'yyyy-MM-dd HH:mm:ss'); // Example format
};

module.exports = mongoose.model('Poll', pollSchema);
