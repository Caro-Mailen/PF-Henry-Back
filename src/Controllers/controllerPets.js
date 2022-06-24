//aca van las funciones controladoras de las rutas pets
const { Pet, User } = require("../db.js");

function petName(req, res, next) {
  const { name } = req.query;
  if (!name) return next();
  Pet.findOne({ where: { name: name } }).then((r) => res.send(r));
}

const pet = async (req, res) => {
  const { page = 0, size = 6, sizePet, gender } = req.query;

  const obj = {};

  if (sizePet) obj.size = sizePet;
  if (gender) obj.gender = gender;

  const options = {
    limit: size,
    offset: size * page,
  };
  if (obj.size || obj.gender) options.where = obj;

  const petFind = await Pet.findAll(options);

  return res.json(petFind);
};

function petId(req, res) {
  const { id } = req.params;
  Pet.findByPk(id).then((r) => res.send(r));
}

const petPost = async (req, res) => {
  const {
    name,
    image,
    size,
    weight,
    fur,
    breed,
    gender,
    castration,
    vaccinate,
  } = req.body;

  if (
    !name ||
    !image ||
    !size ||
    !fur ||
    !breed ||
    !gender ||
    !castration ||
    !vaccinate
  )
    return res.status(400).send("please insert require fields to continue");

  try {
    let infoPet = { ...req.body };
    const newPet = await Pet.create(infoPet);
    // console.log(newPet);
    res.status(200).send(newPet);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  pet,
  petId,
  petName,
  petPost,
};
