const { env } = process;
// import Models Function
const { groupChat } = require('../../models/masters/index');

// Function to save a chat message to the database
const saveMessageToDB = async (data) => {
  try {
    if(!data){return {}};
    // Define the message schema (replace with your database schema)
    const message = {
      userId: data.user_id,
      text: data.message,
      timestamp: new Date(),
    };

    await groupChat.create(message);
    // Insert the message into the database (replace with actual insertion code)
    
    // Return the saved message
    return message;
  } catch (error) {
    // Handle any database errors here
    console.error('Error saving message to the database:', error);
    throw error;
  }
};

module.exports = {
    saveMessageToDB
};
