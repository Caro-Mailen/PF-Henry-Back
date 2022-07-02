const { Router } = require('express')

const pet = require('./routePets')
const user = require('./routeUser')
const userPet = require('./ruteUserPet')
const donation = require('./ruteDonation')
const payment = require('./routePayment')
const breed = require('./routeBreed.js')
const petitionGet = require('./routePetitionGet.js')
// const passport = require('passport')

// const user = require('./routeUser')

const router = Router()

router.use('/pet', pet)
router.use('/donation', donation)
router.use('/user', user)
router.use('/userRegister', user)
router.use('/userLogin', user)
router.use('/userPet', userPet)
router.use('/payment', payment)
router.use('/breed', breed)
router.use('/petitionGet', petitionGet)
router.use('/', (req, res, next) => res.send('welcome to pfmascotas-api'))

module.exports = router
