const users = require("./tbl_users");
const loginCredentials = require("./tbl_login_credentials");
const donors = require("./tbl_donor_details");
const collections = require("./tbl_collections_details");
const guestdonors = require("./tbl_guestdonor_details");



module.exports = {
    users,
    loginCredentials,
    donors,
    collections,
    guestdonors
}