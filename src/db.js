const { Sequelize, DataTypes } = require('sequelize');

// Get the database connection, below is called the connection string.
// let connection_string;
// let memory = 'sqlite: ../db.sqlite'; // in memory only
// let memory = 'sqlite::memory:'; // local persistent file
// let prod = 'postgres://username:password@postgresdb.server:5432/dbname'; // production postgres with username/password. 
// How to choose which one to use? NODE_ENV in express. NODE_ENV= production, staging(some env where we dont have production data), dev(local) 


const db = new Sequelize('sqlite::memory:');

// Define our models
const Survivor = db.define('Survivor', {
  username: DataTypes.STRING,
  strengths: DataTypes.STRING,
  weaknesses: DataTypes.STRING,
  abilities: DataTypes.STRING, 
  powerLevel: DataTypes.INTEGER,
});

const Calamity = db.define('Calamity', {
  type: DataTypes.STRING,
  intensity: DataTypes.INTEGER,
  location: DataTypes.STRING,
})
// IN DEVELOPMENT ONLY!
db.sync();

module.exports = {
  db,
  Survivor,
  Calamity,
};