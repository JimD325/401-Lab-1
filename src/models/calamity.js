const { DataTypes } = require("sequelize");

// const sequelize = require("sequelize");


const Calamity = (db, DataTypes) => db.define('Calamity', {
  type: DataTypes.STRING,
  intensity: DataTypes.INTEGER,
  location: DataTypes.STRING,
})


module.exports =  Calamity;