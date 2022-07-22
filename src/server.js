"use strict";

const express = require("express");
const {logger} = require('./middleware/logger');
const {validator} = require('./middleware/validator');
const Collection = require('./models/collection');
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


// initialization
const app = express();
// middleware
app.use(logger);
app.use(express.json());




app.get("/", hello);
app.get("/data", data);
app.get('/person/:name', validator, person);
// app.get('*', notFound);
app.get('/person/', serverError);
// ---
// From lab four, instatiated collections from collections.js are below.
new Collection(Survivor, app, 'survivor');
new Collection(Calamity, app, 'calamity');


// crud goes here in lab 3. Commenting it out for lab four and refactoring in favor of using a class constructor for route handling instead.
// app.get('/survivor', listSurvivors);
// app.post('/survivor', createSurvivor);
// app.get('/survivor/:id', getSurvivor);
// app.delete('/survivor/:id', deleteSurvivor);
// app.put('/survivor/:id', updateSurvivor)

// app.get('/calamity', listCalamities);
// app.post('/calamity', createCalamity);
// app.get('/calamity/:id', getCalamity);
// app.delete('/calamity/:id', deleteCalamity);
// app.put('/calamity/:id', updateCalamity);

function start(port) {
    app.listen(port, () => console.log(`Server listening on port ${port}`));
}

module.exports = {
    app,
    start,
};