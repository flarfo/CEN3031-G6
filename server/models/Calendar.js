const mongoose = require('mongoose');
const { format } = require('date-fns');

const calendarSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true // Ensure the event ID is unique
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    text: {
        type: String,
        required: true,
        maxlength: 256
    },
    backColor: {
        type: String,
        required: true,
    }
});

// Optional: Add a method to format the date in a specific way
calendarSchema.methods.formatDate = function () {
    return format(this.date, 'yyyy-MM-dd HH:mm', {timeZone: "UTC"}); // Example format
};

module.exports = mongoose.model('Calendar', calendarSchema);
