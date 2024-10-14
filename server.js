require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');

const app = express();
const PORT = process.env.PORT || 3500;

// Add logger middleware to the app
app.use(logger);

app.use(cors(corsOptions));

// Receieve and parse json data
app.use(express.json());

// Search for static files to use on the server
app.use('/', express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));

// If reached, requested resource not found (or not implemented) - send Error 404
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    }
    else {
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler);

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);});