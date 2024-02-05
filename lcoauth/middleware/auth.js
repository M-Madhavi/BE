const jwt = require('jsonwebtoken');
//model is optional
//cookie only for web application
const auth = (req, res, next) => {
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '') ||  req.body.token;
    console.log('Token:',req.cookies);

    if (!token) {
        console.log('Token is missing');
        return res.status(403).send('Token is missing');
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log('Decoded User:', decoded);
        req.user = decoded;
       
    } catch (error) {
        console.error('Token Verification Error:', error);
        return res.status(401).send('Invalid token');
    }
        return next();
};


module.exports = auth;
