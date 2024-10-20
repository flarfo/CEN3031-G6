// EVENT DATA MODEL
const mongoose = require('mongoose');

const eventSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    textContent: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Event', eventSchema);