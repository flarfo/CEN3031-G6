const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async(message, logFileName) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    // Log item (with date, time, and id)
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        // Create logs folder if not already created
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }

        // Append new logitem to log file
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem);
    }
    catch (err) {
        console.log(err);
    }
};

const logger = (req, res, next) => {
    // Log requests (TODO: limit/specify which requests are appended to the logfile)
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'requestLog.log');

    // Debug: log requests to the console
    console.log(`${req.method} ${req.path}`);

    // Go to next middleware
    next();
};

module.exports = { logEvents, logger };