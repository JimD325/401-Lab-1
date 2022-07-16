"use strict";

const express = require("express");
const {logger} = require('./middleware/logger');
const {validator} = require('./middleware/validator');

require('./db');

const hello = (req, res) => {
    res.status(200).send("Hello, World");
};
const notFound = (req,res) => {
    res.status(404).send('Not-Found')
}
const serverError = (req,res)=>{
    res.status(500).send('Server Error');
}

const data = (req, res) => {
    res.status(200).send({
        name: "Jim",
        role: "Student",
    });
};

const person = (req,res)=>{
    res.status(200).send({name:req.params.name});
}

const { createSurvivor, listSurvivors, getSurvivor, deleteSurvivor, updateSurvivor } = require('./handlers/survivor');
const { createCalamity, listCalamities, getCalamity, deleteCalamity, updateCalamity } = require('./handlers/calamity');

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

// crud goes here
app.get('/survivor', listSurvivors);
app.post('/survivor', createSurvivor);
app.get('/survivor/:id', getSurvivor);
app.delete('/survivor/:id', deleteSurvivor);
app.put('/survivor/:id', updateSurvivor)

app.get('/calamity', listCalamities);
app.post('/calamity', createCalamity);
app.get('/calamity/:id', getCalamity);
app.delete('/calamity/:id', deleteCalamity);
app.put('/calamity/:id', updateCalamity);

function start(port) {
    app.listen(port, () => console.log(`Server listening on port ${port}`));
}

module.exports = {
    app,
    start,
};