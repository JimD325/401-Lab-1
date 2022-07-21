// const { DataTypes } = require("sequelize");

// const sequelize = require("sequelize");


const Calamity = (sequelize, DataTypes) => sequelize.define('Calamity', {
  type: DataTypes.STRING,
  intensity: DataTypes.INTEGER,
  location: DataTypes.STRING,
})

// function calamity(db) {
//   return db.define('Calamity',
//     {
//       type: DataTypes.STRING,
//       intensity: DataTypes.INTEGER,
//       location: DataTypes.STRING,
//     },
//   );
// };
module.exports =  Calamity;