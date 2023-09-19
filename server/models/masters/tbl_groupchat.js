const { DataTypes } = require('sequelize');
const sequelize = require("../../database/connection"); 
const Users = require("./tbl_users");

const GroupChat = sequelize().define('tbl_groupchat', {
  user_id: {
    type: DataTypes.STRING,
    references: {
      model: 'tbl_users', // Reference the 'tbl_users' table
      key: 'email_id',
    },
  },
  message: {
    type: DataTypes.STRING,
  },
  time_stamp: {
    type: DataTypes.DATE,
  },
}, {
  // Additional model options here, such as timestamps and tableName
  timestamps: false, // Set to true if your table has created_at and updated_at columns
  schema:'master',
  tableName: 'tbl_groupchat', // Set to match your table name exactly
});

// Define any associations or additional methods here
// Define the association between Users and GroupChat
// Users.hasMany(GroupChat, {
//   foreignKey: 'email_id', // This should match the field in tbl_groupchat that references users
// });
GroupChat.belongsTo(Users, {
  foreignKey: 'user_id',
});



module.exports = GroupChat;
