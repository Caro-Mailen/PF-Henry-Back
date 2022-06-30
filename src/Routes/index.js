const { Router } = require('express')

const pet = require('./routePets')
const user = require('./routeUser')
const userPet = require('./ruteUserPet')
const donation = require('./ruteDonation')
<<<<<<< HEAD
const payment = require('./routePayment')
=======
const breed = require('./routeBreed.js')
>>>>>>> f97ed87555b155a3141029cc8eead891c6694d4e

// const user = require('./routeUser')

const router = Router()

router.use('/pet', pet)
router.use('/donation', donation)
router.use('/user', user)
router.use('/userPet', userPet)
<<<<<<< HEAD
router.use('/payment', payment)
=======
router.use('/breed', breed)
router.use('/', (req, res, next) => res.send('welcome to pfmascotas-api'))
>>>>>>> f97ed87555b155a3141029cc8eead891c6694d4e

module.exports = router
