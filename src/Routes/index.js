const { Router } = require("express");

const { Pet, User } = require("../db.js");
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

router.post("/pet", async (req, res) => {
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
});

router.post("/user", async (req, res) => {
  const {
    name,
    lastname,
    email,
    image,
    address,
    socialMedia,
    tel,
    age,
    isAdmin,
  } = req.body;
  if (!name || !lastname || !email || !address || !socialMedia || !tel || !age)
    return res.status(400).send("please insert require fields to continue");
  try {
    let infoUser = { ...req.body };
    let newUser = await User.create(infoUser);
    res.status(200).send(newUser);
  } catch (e) {
    console.log(e);
  }
});







router.delete('/pet/:id', async (req, res, next) => {
    try{
        const {id} = req.params;
        await Pet.destroy({
            where: {
                id
            }
        })
        res.status(200).send('pet removed successfully')
    }
    catch(error){
        next(error);
    }

})

// router.use('/pets', pets)
// router.use('/donation', donation)
// router.use('/user', user)

module.exports = router;
