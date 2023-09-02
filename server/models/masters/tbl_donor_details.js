// models/collectionsDetails.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../database/connection"); 

const DonorDetails = sequelize().define('tbl_donor_details', {
  phone_no: {
    type: DataTypes.STRING(10),
    primaryKey: true,
  },
  name:{
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  email_id: {
    type: DataTypes.STRING(100),
    defaultValue: 'NA',
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
    type: DataTypes.STRING(100),
    defaultValue: 'NA',
  },
  pan_no: {
    type: DataTypes.STRING(10),
    defaultValue: 'NA',
  },
  creation_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  creater_id: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
},
{
  timestamps: false, // Set to false if you don't want createdAt and updatedAt columns
  schema:'master', // defining schema
  tableName: 'tbl_donor_details', // Use the same table name as in the database
});

module.exports = DonorDetails;
