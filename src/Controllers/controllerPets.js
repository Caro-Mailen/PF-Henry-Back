//aca van las funciones controladoras de las rutas pets
const { Pet } = require("../db.js");

const petName = async (req, res, next) => {
  const { name } = req.query;
  if (!name) return next();
  const pet = await Pet.findAll();
  const petByName = pet.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
  if(petByName.length)return res.send(petByName); 
  else return res.status(404).send("pet not found");
};

const pet = async (req, res) => {
  const { page = 0, size = 6, sizePet, gender, state } = req.query;

  const obj = {};

  if (sizePet) obj.size = sizePet;
  if (gender) obj.gender = gender;
  if (state) obj.state = state;

  const options = {
    limit: size,
    offset: size * page,
  };
  if (obj.size || obj.gender || obj.state) options.where = obj;

  const petFind = await Pet.findAll(options);

  if (!petFind) return res.status(404).send("the search returned no results");

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

const petDelete = async (req, res, next) => {
  try{
    const {id} = req.params;
    await Pet.update(
        {stateBinary: false},
        {where:{
            id
        }}
    )
    res.status(200).send('pet removed successfully')
}
catch(error){
    next(error);
}
}

module.exports = {
  pet,
  petId,
  petName,
  petPost,
  petDelete
};
