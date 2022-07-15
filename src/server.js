"use strict";

const express = require("express");
const {logger} = require('./middleware/logger');
const {validator} = require('./middleware/validator');

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

const name = (req,res)=>{
    res.status(200).send({name:req.params.name});
}

// initialization
const app = express();
// middleware
app.use(logger);


app.get("/", hello);
app.get("/data", data);
app.get('person/:name', validator, name);
app.get('*', notFound);
app.get('/person/', serverError);
// ---

function start(port) {
    app.listen(port, () => console.log(`Server listening on port ${port}`));
}

module.exports = {
    app,
    start,
};