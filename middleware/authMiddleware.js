const jwtHelper = require('../helpers/jwtHelper');

module.exports = (req,res,next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: 'Authentication required!'
        })
    }

    const token = authHeader.split(' ')[1]; // Authorization: 'Bearer {token}'

    const payload = jwtHelper.verifyToken(token);

    if (!payload) {
        return res.status(401).json({
            message: 'Invalid or expired token!'
        })
    }

    // add user from the payload to request object

    req.user = payload;

    next ();
}