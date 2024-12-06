require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const { logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
const cookieParser = require('cookie-parser');



const app = express();
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// Middleware
app.use(logger);
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:3000', // Frontend's origin
    credentials: true, // Allow cookies
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')));

// Routes
app.use('/', require('./routes/root'));
app.use('/events', require('./routes/eventRoutes'));

app.use('/calendar', require('./routes/calendarRoutes'));
app.use('/polls', require('./routes/pollRoutes'));
app.use('/polls/:id/vote', require('./routes/pollRoutes'));
app.use('/auth', require('./routes/authRoutes')); // for all things authetication for login /signup

// 404 Error
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

// Error Handler
app.use(errorHandler);

// Start Server
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB.');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
mongoose.connection.on('error', (err) => {
    console.error(err);
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrorLog.log');
});
