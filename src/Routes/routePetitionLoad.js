const { Router } = require('express')
const {postPetition} = require('../Controllers/controllerPetitionLoad.js')

const router = Router()

router.post('/', postPetition)

module.exports = router