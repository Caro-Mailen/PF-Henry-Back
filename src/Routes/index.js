const { Router } = require("express");

const { Pet, User } = require("../db.js");
const pet = require('./routePets')
const user = require('./routeUser')
const userPet = require('./ruteUserPet');
const donation = require('./ruteDonation')

//const user = require('./routeUser')

const router = Router();

router.use('/pet', pet)
router.use('/donation', donation)
router.use('/user', user)
router.use('/userPet', userPet)

module.exports = router;
