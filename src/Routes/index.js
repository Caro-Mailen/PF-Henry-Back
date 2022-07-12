const { Router } = require('express')
const pet = require('./routePets')
const user = require('./routeUser')
const userPet = require('./ruteUserPet')
const donation = require('./ruteDonation')
const payment = require('./routePayment')
const breed = require('./routeBreed.js')
const petitionGet = require('./routePetitionGet.js')
const petitionLoad = require('./routePetitionLoad.js')
const admin = require('./routeAdmin.js')
const { PetitionGet, PetitionLoad, PetitionGetLost } = require('../db.js')
// const passport = require('passport')

// const user = require('./routeUser')

const router = Router()

router.get('/countP', async (req, res) => {
  const get = await PetitionGet.count()
  const load = await PetitionLoad.count()
  const getLost = await PetitionGetLost.count()
  const total = get + load + getLost
  res.json({ total, get, load, getLost })
})

router.use('/pet', pet)
router.use('/donation', donation)
router.use('/user', user)
router.use('/userPet', userPet)
router.use('/payment', payment)
router.use('/breed', breed)
router.use('/petitionGet', petitionGet)
router.use('/petitionLoad', petitionLoad)
router.use('/admin', admin)
router.use('/', (req, res, next) => res.send('welcome to pfmascotas-api'))

module.exports = router
