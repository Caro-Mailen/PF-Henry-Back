const { Router } = require("express");

const { Pet, User } = require("../db.js");
const pet = require('./routePets')
const user = require('./routeUser')
const userPet = require('./ruteUserPet')

//const user = require('./routeUser')

const router = Router();

// router.put('/user-pet', async (req, res) => {
//   const { userId, petId } = req.body;
//   if (!userId || !petId) return res.status(400).send("please insert require fields to continue")
//   try {
//     let user = await User.findByPk(userId);
//     let pet = await Pet.findByPk(petId);
//     if (!user || !pet) return res.status(400).send("don't exist")
//     await user.addPets(pet);
//     let userXPet = await User.findByPk(userId, { include: Pet });
//     res.send(userXPet);
//   } catch (e) {
//     console.log(e);
//     res.status(400).send(e.message);
//   }
// })

// router.get('/user-pet/:userId', async (req, res) => {
//   const { userId } = req.params;
//   if(isNaN(userId)) return res.status(400).send('userId is not a number');
//   try {
//     let userXPets = await User.findByPk(userId, { include: Pet });
//     res.send(userXPets);
//   } catch (e){
//     console.log(e);
//     res.status(400).send(e.message);
// }})

router.use('/pet', pet)
// router.use('/donation', donation)
router.use('/user', user)
router.use('/userPet', userPet)

module.exports = router;
