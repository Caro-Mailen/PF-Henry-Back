const { Router } = require('express')
const loginWithGoogleApi = require("./loginWithGoogle");
const pet = require('./routePets')
const user = require('./routeUser')
const userPet = require('./ruteUserPet')
const donation = require('./ruteDonation')
const payment = require('./routePayment')
const breed = require('./routeBreed.js')


// const user = require('./routeUser')

const router = Router()


router.use(loginWithGoogleApi)
router.use('/pet', pet)
router.use('/donation', donation)
router.use('/user', user)
router.use('/userPet', userPet)
router.use('/payment', payment)
router.use('/breed', breed)
//router.use('/', (req, res, next) => res.send('welcome to pfmascotas-api'))


module.exports = router
