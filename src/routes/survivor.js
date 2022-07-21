const { Survivor } = require('../db');

const createSurvivor = async (req, res) => {
  console.log("console log on create a survivor");
  const { username, strengths, weaknesses, abilities, powerLevel } = req.body;

  const survivor = Survivor.build({ username, strengths, weaknesses, abilities, powerLevel });

  await survivor.save();

  res.status(201).send(survivor);
};

const deleteSurvivor = async (req, res) => {
  console.log("console log on delete a survivor");
  await Survivor.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).send('Calamity deleted');
};

const updateSurvivor = async (req, res) => {
  console.log("console log on update a survivor");
  await Survivor.update(
    {
      username: req.query.username,
      strengths: req.query.strengths,
      weaknesses: req.query.weaknesses,
      abilities: req.query.abilities,
      powerLevel: req.query.powerLevel
    },
    {
      where: {
        id: req.params.id,
      },
      returning: true,
    }
  )
  res.status(200).send('Survivor updated');
};

const listSurvivors = async (req, res) => {
  const survivor = await Survivor.findAll();
  console.log("console log on List Survivors");
  res.status(200).send(survivor);
};

const getSurvivor = async (req, res) => {
  console.log("console log on Get a survivor");
  const survivors = await Survivor.findAll({
    where: {
      id: req.params.id,
    },
  });

  if (survivors.length > 0) {
    res.status(200).send(survivors[0]);
  } else {
    res.status(404).send(`Could not find survivor with id ${req.params.id}`);
  }
};

module.exports = {
  createSurvivor,
  listSurvivors,
  getSurvivor,
  deleteSurvivor,
  updateSurvivor,
};