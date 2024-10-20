const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) => {
        // if origin in allowedOrigins, run callback
        // Debug: !origin for development (runs in localhost)
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }   
        else  {
            callback(new Error('Origin not allowed by CORS.'), false);
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

module.exports = corsOptions;