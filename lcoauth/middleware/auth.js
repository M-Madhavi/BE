const jwt = require('jsonwebtoken')
//model is optional

const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer', '') || req.cookies.token || req.body.token;
    if (!token) {
        return res.status(403).send('token is missing')
    }
    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        console.log("decode", decode);
        req.user = decode

    } catch (error) {
        res.status(401).send('Invalid token0')
    }
    return next()
}
module.exports = auth