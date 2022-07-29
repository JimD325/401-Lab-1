require ('dotenv').config();
const { Sequelize, DataTypes } = require("sequelize");
const { survivor } = require("./models/survivor");
const  calamity  = require("./models/calamity");
const user = require('./models/user');

// Get the database connection
// const db = new Sequelize("sqlite::memory:");
let connection_string ='sqlite::memory:';
// let connection_string = process.env.NODE_ENV === 'dev' ? 'sqlite:memory:' : process.env.DATABASE_URL
// switch (process.env.NODE_ENV) {
//   case "production":
//     connection_string = process.env.DATABASE_URL;
//     break;
//   case "dev":
//     connection_string = "sqlite::memory:";
//     break;
//   case "staging":
//   default:
//     connection_string = `sqlite:${process.env.SQLITE_FILE ?? "../db"}`;
//     break;
// }
let options = process.env.NODE_ENV === 'production' ? {
  // For postgres only
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  } 
} : {};

let db = new Sequelize(connection_string, options);
let calamityTable = calamity(db, DataTypes);
let survivorTable = survivor(db, DataTypes);
let userTable = user(db,DataTypes);
// IN DEVELOPMENT ONLY!
db.sync();

module.exports = {
  db,
  Survivor: survivorTable,
  Calamity: calamityTable,
  User: userTable,
};