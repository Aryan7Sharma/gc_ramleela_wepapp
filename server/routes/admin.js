const express = require("express");
const router = express.Router();
const {check} = require("express-validator");
// import middleware's
const validateBody = require("../middlewares/validateBody");
const uploadImage = require("../middlewares/utils/uploadImage");

// import Controller
const adminController = require("../controllers/admin/index");


// routers
router.post("/register",uploadImage,
[
    check("name").isString().isLength({max:50}).withMessage("Name must be String with max Length 50 Character including white space."),
    check("email_id").isEmail().withMessage("Invalid Email Address"),
    check("phone_no").isMobilePhone().isLength({min:10,max:10}).withMessage("Invalid Mobile Number"),
    check("password").isLength({min:8,max:16}).withMessage("Password Legth is Incorrect"),
    check("flat_no").isString().isLength({max:10}).withMessage("Flat No length is grate than 10, make it less than or equal to 10 character."),
    check("block_no").isString().isLength({max:10}).withMessage("Block No length is grate than 10, make it less than or equal to 10 character."),
    check("society_name").isString().isLength({max:50}).withMessage("Society Name length is grate than 50, make it less than or equal to 50 character."),
    check("city_name").isString().isLength({max:20}).withMessage("City length is grate than 20, make it less than or equal to 20 character."),
],validateBody,
adminController.registerCollector
);

router.post("/collectorBlockUnblock",
[
    check("collector_id").exists().withMessage("Collector Id is required").isEmail().withMessage("Invalid Collector ID."),
    check("action").matches(/^[YN]$/).exists().withMessage("Action is required").withMessage("Action must be 'Y' or 'N'.")
    
],validateBody,
adminController.CollectorBlockUnblock
);


router.get(
    "/getallCollectionsDetails",
    adminController.getallCollectionsDetails
);

router.get(
    "/getallDonorsDetails",
    adminController.getallDonorsDetails
);

router.get(
    "/getallUsersDetails",
    adminController.getallUsersDetails
);

router.get(
    "/getallCollectorsDetails",
    adminController.getallCollectorsDetails
);

module.exports = router