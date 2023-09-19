const express = require("express");
const router = express.Router();
const {check} = require("express-validator");
// import middleware's
const validateBody = require("../middlewares/validateBody");
// import Controller
const commonController = require("../controllers/common/index");

// routers
router.get("/getallmessages",
commonController.getAllMessagesWithUserDetails
);

router.get("/getallusers",
commonController.getallUsersDetails
);


module.exports = router