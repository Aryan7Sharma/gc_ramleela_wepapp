// models/collectionsDetails.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../database/connection"); 

const LoginCredentials = sequelize().define('tbl_login_credentials', {
  user_id: {
    type: DataTypes.STRING(100),
    primaryKey: true,
  },
  hash_password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  user_type: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  active:{
    type:DataTypes.STRING(1),
    defaultValue:'Y',
  }
 },
  {
    timestamps: false, // Set to false if you don't want createdAt and updatedAt columns
    schema:'master', // defining schema
    tableName: 'tbl_login_credentials', // Use the same table name as in the database
});

module.exports = LoginCredentials;
