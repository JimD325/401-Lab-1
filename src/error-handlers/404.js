'use strict';
module.exports =(req,res)=>{
  res.status.send({
    message: 'Not-Found',
    error: 404,
    route: req.path
  })
};

