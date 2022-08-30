const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const bearer = req.headers['authorization'];
    if (typeof bearer === 'undefined') {
        return res.status(403).json({message: 'Unauthorized'});
    }

    const token = bearer.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({message: err.message});
        }
        req.user_id = decoded.user_id;
        next();
    }
    );
}

module.exports = verifyToken;