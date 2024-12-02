const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];  // Extract the token from header

    if (!token) {
        return res.sendStatus(401);  // Unauthorized if no token is provided
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);  // Forbidden if token is invalid
        }
        req.user = user;  // Attach user to request object
        next();  // Pass control to the next middleware or route handler
    });
};

module.exports = authenticateToken;








// const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//     const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
//     // if (!token) return res.sendStatus(401); // Unauthorized
//     if (!token) {
//         console.log('No token provided');
//         return res.sendStatus(401); // Unauthorized
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403); // Forbidden
//         req.user = user;
//         next();
//     });
// };

// module.exports = authenticateToken;
