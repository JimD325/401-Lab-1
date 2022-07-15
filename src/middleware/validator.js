'use strict';

const validator = (req,res,next)=>{
  // if name exists, go on to next middleware, if not, throw an error
  if (req.params){
    next();
  }
  else{
    throw new Error('Empty string on query for name propery')
  }
};

module.exports ={
  validator,
};