const jwt = require("jsonwebtoken");
const keysecret = process.env.SECRET_KEY
const users = require("../models/master/tbl_users");

const authenticate = async (req, res, next) => {
    const token = req.headers.Authorization || req.cookies.token;
    const userType = req.cookies.userType
    if (!token || userType) {
        return res.status(401).json({ error: 'Token not provided' });
    }
    try {
        const decodetoken = jwt.verify(token, keysecret);
        const verifyUser = await users.findOne({
            where: {
                userid: decodetoken,
                usertype: userType,
            },
        });

        if (!verifyUser) {
            return res.status(401).json({ status:env.s401, msg: 'You are not authorized user to access this!' });
        }
        req.token = token;
        req.userid = verifyUser.userid;
        req.userType = verifyUser.agencytype;

        next();

    } catch (error) {
        // Handle token verification errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({status:env.s401, msg: 'Token expired' });
        }
        return res.status(500).json({ status:env.s500, msg: 'Internal Server Error' });
    }
}


module.exports = authenticate