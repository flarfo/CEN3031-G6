const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    options: String,
    votes: {
        type: Number,
        default: 0
    }
});

const pollSchema = new mongoose.Schema({
    user: {
        type:  mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    question: String,
    options: [{}],
    voted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Poll', pollSchema)
