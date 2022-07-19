const { DataTypes } = require("sequelize");

function survivor(db) {
  return db.define("Survivor", {
    username: DataTypes.STRING,
    strengths: DataTypes.STRING,
    weaknesses: DataTypes.STRING,
    abilities: DataTypes.STRING, 
    powerLevel: DataTypes.INTEGER,
  });
}

module.exports = { survivor };