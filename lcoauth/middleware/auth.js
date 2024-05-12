const jwt = require('jsonwebtoken');
//model is optional
//cookie only for web application, if http flag is true in options of cookies it is accesseble only onBE
const auth = (req, res, next) => {
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '') || req.body.token;
    console.log('Token:', req.cookies);

    // //if you want to use cookie
    // const options = {
    //     expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    //     httpOnly: true,//read only by BE server
    // }
    // return res.status(200).cookie('token', token, options).json({
    //     success: true,
    //     token,
    //     user
    // })


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
