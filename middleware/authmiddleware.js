const jwt = require('jsonwebtoken');

module.exports.Authenticate = async (req, res, next) => {

    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({
            error: 'Access denied. No token provided'
        })
    }

    const token = authHeader.replace(/Bearer\s+/gi, '').trim();

    console.log();

    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }

}
