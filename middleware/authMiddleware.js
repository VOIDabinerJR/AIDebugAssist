const { decodeToken } = require('../utils/jwt');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = decodeToken(token);
        req.userId = decoded.id;
        next();
    } catch (err) {
        console.error('Token error:', err);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = authenticate;
