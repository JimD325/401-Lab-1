'use strict';

const {logger}= require('../src/middleware/logger');

describe('Logger', ()=> {
  // this tests that logger actually calls console.log
  it('runs console.log', ()=> {
    jest.spyOn(console,'log').mockImplementation();
    // set up
    const req = {method: 'GET', url: '/'};
    const res = {};
    const next = () => {};
    // action
    logger(req,res,next);

    // assertions
    expect(console.log).toHaveBeenCalledWith('GET', '/'); 
  })
  // this tests that next() is called and moves control the the next middleware in the stack. 
  it('calls next', ()=> {
    // set up
    const req ={method:'GET', url:'/'};
    const res ={};
    const next = jest.fn();
    logger(req,res,next);
    expect(next).toHaveBeenCalled();
  });
})