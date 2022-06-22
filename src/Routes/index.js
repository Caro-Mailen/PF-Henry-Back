const { Router } = require("express");

const { Pet } = require("../db.js");
// const pets = require('./routePets')
// const donation = require('./routeDonation')
//const user = require('./routeUser')

const router = Router();

router.get("/pets", (req, res) => {
  Pet.findAll().then((r) => res.send(r));
});

router.get("/pet", (req, res) => {
  const { name } = req.query;
  Pet.findOne({ where: { name: name } }).then((r) => res.send(r));
});

router.get("/pet/:id", (req, res) => {
  const { id } = req.params;
  Pet.findByPk(id).then((r) => res.send(r));
});

router.post("/pet", (req, res) => {
  console.log(req.body);
  //   const {
  //     name,
  //     image,
  //     size,
  //     weight,
  //     fur,
  //     breed,
  //     gender,
  //     castration,
  //     vaccinate,
  //     UserId,
  //   } = req.body;

  //   const characterCreate = Pet.create({
  //     name,
  //     image,
  //     size,
  //     weight,
  //     fur,
  //     breed,
  //     gender,
  //     castration,
  //     vaccinate,
  //   });

  //   // const episodeDb = await Episode.findAll({where:{name:name}})
  //   // characterCreate.addEpisode(episodeDb)

  //   res.send("Personaje creado con exito").json(characterCreate);
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
    const newPet = Pet.create({
      name,
      image,
      size,
      weight,
      fur,
      breed,
      gender,
      castration,
      vaccinate,
    });
    // console.log(newPet);
    res.status(200).send(newPet);
  } catch (error) {
    console.log(error);
  }
});

// router.use('/pets', pets)
// router.use('/donation', donation)
// router.use('/user', user)

module.exports = router;
