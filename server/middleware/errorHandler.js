const { logEvents } = require('./logger');

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errorLog.log');
    // Debug: log error information
    console.log(err.stack);

    const status = res.statusCode ? res.statusCode : 500; // 500 -> server error
    res.status(status);
    res.json({ message: err.message });
};

module.exports = errorHandler;