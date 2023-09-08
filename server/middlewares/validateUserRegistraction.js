const { env } = process;
// Models
const {loginCredentials} = require("../models/masters/index");

const verifyingUserRegistraction = async (req, res, next) => {
    try {
        const  {email_id}  = req.body;
        const user = await loginCredentials.findByPk(email_id);
        if (!user) { return res.status(404).json({ status: env.s404, msg: "User not found" }); };
        // Store the user details in the request object
        //req.userDetails = userDetails.dataValues;
        // If User is Registered then, proceed to the next middleware or route handler
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error", errormsg: error });
    }
};

module.exports = verifyingUserRegistraction;