const jwt = require("jsonwebtoken");
const keysecret = process.env.SECRET_KEY
const loginCred = require("../models/masters/tbl_login_credentials");
const {env} = process;
const verifyAdmin = async (req, res, next) => {
    //console.log(,req.headers.cookie,"check", req.cookie);
    const token = req.headers.authorization || req.headers.Authorization || req.cookies.token;
    if (!token) {return res.status(401).json({ error: 'Token not provided' })};
    try {
        const decodetoken = jwt.verify(token, keysecret);
        console.log(decodetoken.id)
        const verifyUser = await loginCred.findOne({
            where: {
                user_id: decodetoken.id,
                user_type: 0,
                active:'Y',
            },
        });
        if (!verifyUser) {
            return res.status(401).json({ status:env.s401, msg: 'You are not authorized user to access this!' });
        }
        req.user_id = verifyUser.user_id;
        next();

    } catch (error) {
        console.error(error)
        // Handle token verification errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({status:env.s401, msg: 'Token expired' });
        }
        return res.status(500).json({ status:env.s500, msg: 'Internal Server Error' });
    }
}


module.exports = verifyAdmin