const { Router } = require("express");

const pet = require('./routePets')
const user = require('./routeUser')
const userPet = require('./ruteUserPet');
const donation = require('./ruteDonation')
const payment = require('./routePayment')

//const user = require('./routeUser')

const router = Router();

router.use('/pet', pet)
router.use('/donation', donation)
router.use('/user', user)
router.use('/userPet', userPet)
router.use('/payment', payment)

module.exports = router;
