const express = require("express");
const router = express.Router();
const {check} = require("express-validator");
// import middleware's
const validateBody = require("../middlewares/validateBody");
// import Controller
const collectorController = require("../controllers/collectors/index");


// routers
router.post("/testing",(req,res)=>{
    return res.status(200).json({ status: "OK", msg: "Api created"});
})

router.post(
    "/donationcollection",
    [
        check("name").isString().isLength({max:50}).withMessage("Name must be String with max Length 50 Character including white space."),
        check("email_id").isEmail().withMessage("Invalid Email Address"),
        check("phone_no").isMobilePhone().isLength({min:10,max:10}).withMessage("Invalid Mobile Number"),
        check("flat_no").isString().isLength({max:10}).withMessage("Flat/House No length is grate than 10, make it less than or equal to 10 character."),
        check("block_no").isString().isLength({max:10}).withMessage("Block No length is grate than 10, make it less than or equal to 10 character."),
        check("society_name").isString().isLength({max:50}).withMessage("Society Name length is grate than 50, make it less than or equal to 50 character."),
        check("city_name").isString().isLength({max:20}).withMessage("Address length is grate than 20, make it less than or equal to 20 character."),
        check("collected_ammount").notEmpty().isString().isLength({max:7}).withMessage("Amount must not ne empty"),
        check("payment_type").notEmpty().isString().isLength({min:1, max:1}).withMessage("payment_type must not ne empty")
    ],validateBody,
    collectorController.donationCollection
);
router.post(
    "/donationcollectionforguest",
    [
        check("name").isString().isLength({max:50}).withMessage("Name must be String with max Length 50 Character including white space."),
        check("flat_no").isString().isLength({max:10}).withMessage("Flat/House No length is grate than 10, make it less than or equal to 10 character."),
        check("block_no").isString().isLength({max:10}).withMessage("Block No length is grate than 10, make it less than or equal to 10 character."),
        check("society_name").isString().isLength({max:50}).withMessage("Society Name length is grate than 50, make it less than or equal to 50 character."),
        check("city_name").isString().isLength({max:20}).withMessage("Address length is grate than 20, make it less than or equal to 20 character."),
        check("collected_ammount").notEmpty().isString().isLength({max:7}).withMessage("Amount must not ne empty"),
        check("payment_type").notEmpty().isString().isLength({min:1, max:1}).withMessage("payment_type must not ne empty")
    ],validateBody,
    collectorController.donationCollectionforGuest
);

router.post(
    "/updateprofile",
    [
        check("name").isString().isLength({max:50}).withMessage("Name must be String with max Length 50 Character including white space."),
        //check("address").isString().isLength({max:255}).withMessage("Address length is grate than 255, make it less than or equal to 255 character.")
    ],validateBody,
    collectorController.updateProfile
);


router.post(
    "/donorDetail",
    [
        check("phone_no").isMobilePhone().isLength({min:10,max:10}).withMessage("Invalid Mobile Number")
    ],validateBody,
    collectorController.getDonorDetail
);


router.get(
    "/getallCollectionsDetails",
    collectorController.getallCollectionsDetails
);



module.exports = router