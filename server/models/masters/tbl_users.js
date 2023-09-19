// models/collectionsDetails.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../database/connection"); 
const LoginCredentials = require('./tbl_login_credentials');

const Users = sequelize().define('tbl_users', {
  email_id: {
    type: DataTypes.STRING(100),
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  phone_no: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  flat_no: {
    type: DataTypes.STRING(10),
    defaultValue: 'NA',
  },
  block_no: {
    type: DataTypes.STRING(10),
    defaultValue: 'NA',
  },
  society_name: {
    type: DataTypes.STRING(50),
    defaultValue: 'NA',
  },
  city_name: {
    type: DataTypes.STRING(20),
    defaultValue: 'NA',
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  creation_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  creater_id: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  profile_img_path:{
    type:DataTypes.STRING(),
    defaultValue:'NA',
  }
},
{
  timestamps: false, // Set to false if you don't want createdAt and updatedAt columns
  schema:'master', // defining schema
  tableName: 'tbl_users', // Use the same table name as in the database
});

//Users.hasOne(LoginCredentials, { foreignKey: 'user_id'});

module.exports = Users;
