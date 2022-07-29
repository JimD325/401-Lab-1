const { User } = require('../db');
const { bcrypt } = require('bcrypt');



// signup 
const createUser = async (req, res) => {

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await User.create(req.body);
    res.status(201).json(record);
  } catch (e) { res.status(403).send("Error Creating User");
      console.log(e); }
};



// sign in

// export

module.exports ={
  createUser,
}