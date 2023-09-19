const { env } = process;
// import Models Function
const { users, loginCredentials } = require('../../models/masters/index');
const { getAllMessages, getAllUsers } = require('../../models/masters/functions/index');

// Define a function to get all messages with user details
async function getAllMessagesWithUserDetails(req, res) {
  try {
    // Retrieve all messages from the GroupChat model
    const messages = await getAllMessages();
    res.status(200).json({ status: env.s200, msg: "All Messages Fetched Successfully.", data: messages });
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ status: env.s500, msg: "Internal Server Error", error: error });
  }
}
console.log("inside0");
const getallUsersDetails = async (req, res) => {
  try {
    const allusersdata = await getAllUsers();
    if (!allusersdata) { return res.status(404).json({ status: env.s404, msg: "OOPs data not found!" }); };
    return res.status(200).json({ status: env.s200, msg: "data found successfully", data: allusersdata });
  } catch (error) {
    console.log("error",error);
    res.status(200).json({ status: env.s200, msg: "Internal Server Error"});
  }
};


module.exports = {
  getAllMessagesWithUserDetails,
  getallUsersDetails
};
