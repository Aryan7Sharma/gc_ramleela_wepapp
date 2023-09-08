const express = require("express");
const router = express.Router();
const {check} = require("express-validator");
// import middleware's
const validateBody = require("../middlewares/validateBody");
const validateUserExistence = require("../middlewares/validateUserRegistraction");
const validateAlltypeUser = require("../middlewares/auth/verifyAllTypeUser");
// import Controller
const authController = require("../controllers/auth/index");



// routers
router.post("/login",
[
    check("email_id").isEmail().withMessage("Invalid Email Address"),
    check("password").isLength({min:8,max:16}).withMessage("Password Legth is Incorrect")
],validateBody, validateUserExistence,
authController.login
);

router.post("/forgetPassword",
[
    check("email_id")
        .exists().withMessage("User ID is required")
        .notEmpty().withMessage("User ID cannot be empty")
        .isEmail().withMessage("Invalid Email Address"),
],validateBody, validateUserExistence,
authController.forgetPassword
);


router.post("/changePassword",validateAlltypeUser,
[ 
    check("old_password").exists().withMessage("Old Password is required").isLength({min:8,max:16}).withMessage("Invalid Old Password"),
    check("new_password").exists().withMessage("Old Password is required").isLength({min:8,max:16}).withMessage("Invalid New Password")
],validateBody,
authController.changePassword
);


router.post("/logout",validateAlltypeUser,
authController.logout
);


router.get("/userdetails",validateAlltypeUser,
authController.getUserDetails
);


router.post("/generateReceipt",validateAlltypeUser,
[
    check("receipt_no").exists().withMessage("Receipt No is required").isLength({min:11,max:11}).withMessage("Invalid Receipt No."),
],validateBody,
authController.generateReceipt
);

router.post('/getReceiptsInfoByPhoneNo',validateAlltypeUser,
[
    check("phone_no").exists().withMessage("Phone No is required").isMobilePhone().isLength({min:10,max:10}).withMessage("Invalid Mobile Number")
],validateBody,
authController.getReceiptsInfoByPhoneNo);

router.post('/getReceiptsInfoByReceiptNo',validateAlltypeUser,
[
    check("receipt_no").exists().withMessage("Receipt No is required").isString().isLength({min:7,max:11}).withMessage("Invalid Receipt Number")
],validateBody,
authController.getReceiptsInfoByReceiptNo);

router.post(
    "/updateprofile",validateAlltypeUser,
    [
        check("name").exists().withMessage("Name is required").isString().isLength({max:50}).withMessage("Name must be String with max Length 50 Character including white space."),
    ],validateBody,
    authController.updateProfile
);




const path = __dirname.split('/');
path.pop();
const profileimgPath = path.join('/')+'/public/Images/UsersProfileImage/';
router.get('/images/profileimg/:filename', (req, res) => {
    const { filename } = req.params;
    res.sendFile(profileimgPath + filename);
  });



module.exports = router