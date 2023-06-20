const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signToken = (user) => {
    return jwt.sign(
        {
            userId: user.id,
        },
        process.env.JWT_KEY,
        {
            expiresIn: '1h'
        })
}

exports.verifyToken = (token) => {
    try {
        return jwt.verify(
            token,
            process.env.JWT_KEY
        )
    } catch (e) {
        return null;
    }
}