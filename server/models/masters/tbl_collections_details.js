// models/collectionsDetails.js
const { Sequelize, DataTypes } = require('sequelize');
//const sequelize = new Sequelize(require('../config.json')[process.env.NODE_ENV || 'development']);
const sequelize = require("../../database/connection"); 
const CollectionsDetails = sequelize().define('tbl_collections_details', {
  receipt_no: {
    type: DataTypes.STRING(10),
    primaryKey: true,
  },
  donor_phoneno: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  collector_id: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  collection_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  collected_ammount: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  payment_type: {
    type: DataTypes.STRING(1),
    allowNull: false,
  },
  payment_name: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  reference_no: {
    type: DataTypes.STRING(40),
    defaultValue: 'NA',
  },
},
{
  timestamps: false, // Set to false if you don't want createdAt and updatedAt columns
  schema:'master', // defining schema
  tableName: 'tbl_collections_details', // Use the same table name as in the database
});

module.exports = CollectionsDetails;
