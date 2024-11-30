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
pollSchema.methods.formatDate = function () {
    return format(this.date, 'yyyy-MM-dd HH:mm:ss'); // Example format
};

module.exports = mongoose.model('Poll', pollSchema);







// const mongoose = require('mongoose');
// const User = require('./User');

// const optionSchema = new mongoose.Schema({
//   option: String,
//   votes: {
//     type: Number,
//     default: 0,
//   },
// });

// const pollSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   },
//   created: {
//     type: Date,
//     default: Date.now,
//   },
//   question: String,
//   options: [optionSchema],
//   voted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
// });

// pollSchema.pre('remove', async function(next) {
//   try {
//     const user = await User.findById(this.user);
//     user.polls = user.polls.filter(
//       poll => poll._id.toString() !== this._id.toString(),
//     );
//     await user.save();
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// });

// module.exports = mongoose.model('Poll', pollSchema);