'use strict';

module.exports = (error,req,res,next)=>{
  res.status(500).send({
    error: 500,
    body: req.body,
    query: req.query,
    route: req.path,
    message: `Server Error Message: ${error.message}`
  })
};