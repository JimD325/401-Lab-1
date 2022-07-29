"use strict";

const express = require("express");
const {logger} = require('./middleware/logger');
const {validator} = require('./middleware/validator');
const Collection = require('./models/collection');
const User = require('./models/user');
// each instantiation of the Collection class which we are using for lab4 will need access to  ./db in order to access Sequelize.
const {db, Survivor, Calamity} =require('./db');

const hello = (req, res) => {
    res.status(200).send("Hello, World");
};
// const notFound = (req,res) => {
//     res.status(404).send('Not-Found')
// }
const serverError = (req,res)=>{
    res.status(500).send('Server Error');
}
// app.get
const data = (req, res) => {
    res.status(200).send({
        name: "Jim",
        role: "Student",
    });
};

const person = (req,res)=>{
    res.status(200).send({name:req.params.name});
}
// Below is commented out for lab four, since we are refactoring to DRY it out. 
// const { createSurvivor, listSurvivors, getSurvivor, deleteSurvivor, updateSurvivor } = require('./routes/survivor');
// const { createCalamity, listCalamities, getCalamity, deleteCalamity, updateCalamity } = require('./routes/calamity');
const {createUser} = require('./routes/user');


// initialization
const app = express();
// middleware
app.use(logger);
// Process JSON input and put the data on req.body
app.use(express.json());
// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));




app.get("/", hello);
app.get("/data", data);
app.get('/person/:name', validator, person);
// app.get('*', notFound);
app.get('/person/', serverError);
// ---
// From lab four, instatiated collections from collections.js are below.
// commented out for lab6
// new Collection(Survivor, app, 'survivor');
// new Collection(Calamity, app, 'calamity');
// For Lab 6, went with a new routes file for users instead of adding onto collections. The individual routes are given below for the signup and login functionality. 
app.post('/signup', createUser);



function start(port) {
    app.listen(port, () => console.log(`Server listening on port ${port}`));
}

module.exports = {
    app,
    start,
};