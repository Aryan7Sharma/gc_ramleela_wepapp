const jwt = require("jsonwebtoken");
const keysecret = process.env.SECRET_KEY
const {loginCredentials} = require("../../models/masters/index");
const {env} = process;
const verifyAdmin = async (req, res, next) => {
    const token = req.headers.authorization || req.headers.Authorization || req.cookies.token;
    if (!token) {return res.status(401).json({ error: 'Token not provided' })};
    try {
        const decodetoken = jwt.verify(token, keysecret);
        
        const user = await loginCredentials.findByPk(decodetoken.id);
        if (!user || user?.active!=='Y') {return res.status(401).json({ status:env.s401, msg: 'You are not authorized user to access this!' });}
        req.user = user;
        next();
    } catch (error) {
        // Handle token verification errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({status:env.s401, msg: 'Token expired' });
        }
        return res.status(500).json({ status:env.s500, msg: 'Internal Server Error' });
    }
}


module.exports = verifyAdmin