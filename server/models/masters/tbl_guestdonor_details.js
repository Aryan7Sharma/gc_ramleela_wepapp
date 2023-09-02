// models/collectionsDetails.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../database/connection"); 

const GuestDonorDetails = sequelize().define('tbl_guestdonor_details', {
  name:{
    type: DataTypes.STRING(),
    defaultValue: 'NA',
    allowNull: false,
  },
  receipt_no:{
    primaryKey: true,
    type: DataTypes.STRING(),
    allowNull:false,
  },
  flat_no: {
    type: DataTypes.STRING(),
    defaultValue: 'NA',
    allowNull: false,
  },
  block_no: {
    type: DataTypes.STRING(),
    defaultValue: 'NA',
    allowNull: false,
  },
  society_name: {
    type: DataTypes.STRING(),
    defaultValue: 'NA',
    allowNull: false,
  },
  city_name: {
    type: DataTypes.STRING(),
    defaultValue: 'NA',
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(),
    defaultValue: 'NA',
    allowNull: false,
  },
  creater_id: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  creation_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},
{
  timestamps: false, // Set to false if you don't want createdAt and updatedAt columns
  schema:'master', // defining schema
  tableName: 'tbl_guestdonor_details', // Use the same table name as in the database
});

module.exports = GuestDonorDetails;
