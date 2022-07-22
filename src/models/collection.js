// Handles the CRUD operations for a model, and the methods can be routed directly. Constructor should contain the CRUD functionality you are looking to implment(Create, Read 1, Read Many, Delete,), as well as the routes. These routes will replace what you created in lab 3 on server.js as well as the CRUD functionality created in routes for calamity.js and survivor.js.

class Collection {
  constructor(model, app, routeName) {
    this.model = model;
    this.modelRoute(app, routeName);
    
  }

  // create
  async create(req, res) {
    // if res.status returns 201, send the model we are building using the body of the request, wait on it to be created, then save it.
    // if it returns anything other than a 201 created message, then send an error message.
    try {
      res.status(201).send(await this.model.build(req.body).save());
    }
    catch {
      res.status(500).send('-----> Error in create for Collection.js: ', error);
    }
  };
  // // read. For List: if id doesnt exist, set the empty data object equal to everything in the database. if ID does exist, set data equal to the object in the database with an id of ID. 
  async read(req, res) {
    let data={};
    let list = {};
    const id = req.params.id;
    try{
      if(!id){
        list = await this.model.findAll(data);
        // res.status(200).send(data);
      }
      else{
        data['where'] ={id};
        list = await this.model.findOne(data);
        // res.status(200).send(data);
      }
      res.status(200).send(list);
    }
    catch(err){
      res.status(500).send(err);
    }

  };
  // update
  async update(req, res) {
    const id = req.params.id;
    try{
      res.status(200).send(
        await this.model.update(req.body, {where:{id}}));
    }
    catch(error){
      res.status(500).send(error);
    }
  };
  // // delete
  async delete(req, res) {
    const id = req.params.id;
    try{
        await this.model.destroy({where: {id}});
        res.status(200).send('Delete Successful');
    }
    catch(error){
      res.status(500).send(error);
      console.log('error while deleteing');
    }
  };
  // the model for the routes is given below. the callback function for this.read needs an arrow function to work properly. Big shout out to Zayah for the tip. 

  modelRoute = (app, routeName) => {
    app.post(`/${routeName}`, (req,res) => this.create(req,res));
    app.get(`/${routeName}/:id`, (req, res) => this.read(req, res));
    app.get(`/${routeName}`, (req, res) => this.read(req, res));
    app.put(`/${routeName}/:id`, (req, res) => this.update(req, res));
    app.delete(`/${routeName}/:id`, (req, res) => this.delete(req, res));
  };
};


module.exports = Collection;

