// EVENT DATA MODEL
const mongoose = require('mongoose');
const { format } = require('date-fns')

const eventSchema  = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Event', eventSchema);