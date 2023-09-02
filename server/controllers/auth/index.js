bcrypt = require("bcryptjs");
const { cookie } = require("express-validator");
const jwt = require("jsonwebtoken");
const { env } = process;
const SecretKey = env.SECRET_KEY

// import utils function's
const { generateNewPassword, hashPassword } = require("../../utils/commonFunc");
const { sendNewPassword } = require("../../utils/sendMail");

// import models:
const { Op } = require('sequelize');
const { users, collections } = require("../../models/masters/index");
// import db function's
const { getReceiptInfo } = require('../../models/masters/functions/index');

//const { rawSelectQuery,rawQuery } = require("../../database/SequilizeQuerys");


const userRegistraction = async (req, res) => {
    const { name, email, phone, password, cpassword } = req.body;
    if (password !== cpassword) { return res.status(422).json({ status: env.s422, msg: "Password does not match with Confirm Password" }) };
    if (!name || !email || !phone || !password) { return res.status(422).json({ status: env.s422, msg: "Fields are Missing!" }) };
    try {
        // Check if the user with the provided email already exists
        const existingUser = await user.findOne({ where: { userid: email } });
        if (existingUser) { return res.status(409).json({ status: env.s409, msg: "User already registered with this email", data: existingUser }); }
        // registering new user
        const userDetails = {
            userid: email,
            name: name,
            phoneno: phone,
            password: password,
            hash_password: password,
            registrationdate: new Date(),
        }
        const newUser = await user.create(userDetails);
        if (!newUser) { return res.status(304).json({ status: env.s304, msg: "User Registaction Failed!" }); };
        return res.status(201).json({ status: env.s201, msg: "User Registered Successfully!", data: newUser });
    } catch (error) {
        return res.status(500).json({ status: env.s500, msg: "Internal Server Error", error: error });
    }
};

const login = async (req, res) => {
    try {
        const { password } = req.body;
        const { user_id, hash_password, user_type } = req.user;
        if (!user_id) { return res.status(404).json({ status: env.s404, msg: "User not found" }); };
        const matchPass = await bcrypt.compare(password, hash_password);
        if (!matchPass) { return res.status(422).json({ status: env.s422, msg: "Incorrect Password" }); };
        const token = jwt.sign({ id: user_id }, SecretKey, { expiresIn: '1d' });
        const oneDay = 1000 * 60 * 60 * 24;
        res.cookie("token", token, {
            expires: new Date(Date.now() + oneDay),
            httpOnly: true,
        });
        return res.status(200).json({ status: env.s200, msg: "You Logged In Successfully!", data: { user_type: user_type.toString(), token: token } });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ status: env.s500, msg: "Internal Server Error" });
    }
};


const logout = (req, res) => {
    try {
        res.clearCookie("token"); // Clear the "token" cookie
        return res.status(200).json({ status: env.s200, msg: "Logged Out Successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: env.s500, msg: "Internal Server Error" });
    }
};

const changePassword = async (req, res) => {
    try {
        const { user } = req;
        const { old_password, new_password } = req.body;
        const matchPass = await bcrypt.compare(old_password, user.hash_password);
        if (!matchPass) { return res.status(422).json({ status: env.s422, msg: "Incorrect Password" }); };
        const hash_password = await hashPassword(new_password); // convert plain password into hashpassword
        // Update the user's hashed password in the database
        user.hash_password = hash_password;
        await user.save();
        res.status(200).json({ status: env.s200, msg: "Your Password Updated Successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: env.s500, msg: "Internal Server Error", error: error });
    }
};


const forgetPassword = async (req, res) => {
    try {
        const { user } = req;
        const newPassword = generateNewPassword();
        const hash_password = await hashPassword(newPassword); // convert plain password into hashpassword
        // Update the user's hashed password in the database
        user.hash_password = hash_password;
        await user.save();
        const sendOtpResponce = await sendNewPassword(user.user_id, newPassword);
        if (!sendOtpResponce || sendOtpResponce.status !== "successfull") { res.status(417).json({ status: env.s417, msg: "Failed to Send New Password Over Mail Contact your Admin!" }); };
        // sending final responce;
        res.status(200).json({ status: env.s200, msg: "New Passord Send into Your Registered Mail ID." });
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: env.s500, msg: "Internal Server Error", error: error });
    }
};


const getUserDetails = async (req, res) => {
    try {
        const { user } = req;
        const userDetails = await users.findByPk(user.user_id);
        if (!userDetails) { res.status(404).json({ status: env.s404, msg: "Failed to load User Details." }); };
        res.status(200).json({ status: env.s200, msg: "User Details Found Successfully", data: userDetails });
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: env.s500, msg: "Internal Server Error", error: error });
    }
};

const generateReceipt = async (req, res) => {
    try {
        const { receipt_no } = req.body;
        const receipt_details = await getReceiptInfo(receipt_no);
        if (!receipt_details.length) { return res.status(404).json({ status: env.s404, msg: "Receipt Details did not Found!" }); }
        return res.status(200).json({ status: env.s200, msg: "Receipt Details Founded Successfully", receipt_details: receipt_details });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: env.s500, msg: "Internal Server Error" });
    }
};


const getReceiptsInfoByPhoneNo = async (req, res) => {
    try {
        const { phone_no } = req.body;
        const data = await collections.findAll({
            attributes: ['receipt_no', 'collection_date', 'collected_ammount'],
            where: {
                donor_phoneno: phone_no
            }
        });
        if (!data || !data?.length) { return res.status(404).json({ status: env.s404, msg: "No Receipt Details Found aganist this Phone No!" }); }
        return res.status(200).json({ status: env.s200, msg: "Receipt Details Founded Successfully", data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: env.s500, msg: "Internal Server Error" });
    }
};

const getReceiptsInfoByReceiptNo = async (req, res) => {
    try {
        const { receipt_no } = req.body;
        console.log("check---->", receipt_no);
        const data = await collections.findAll({
            attributes: ['receipt_no', 'collection_date', 'collected_ammount'],
            where: {
                receipt_no: {
                    [Op.like]: `${receipt_no}%`
                }
            }
        });
        if (!data || !data?.length) { return res.status(404).json({ status: env.s404, msg: "No Receipt Details Found aganist this Receipt No!" }); }
        return res.status(200).json({ status: env.s200, msg: "Receipt Details Founded Successfully", data: data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: env.s500, msg: "Internal Server Error" });
    }
};




module.exports = {
    login,
    logout,
    forgetPassword,
    changePassword,
    getUserDetails,
    generateReceipt,
    getReceiptsInfoByPhoneNo,
    getReceiptsInfoByReceiptNo,
}
