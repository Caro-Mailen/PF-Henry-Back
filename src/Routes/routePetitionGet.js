const { Router } = require('express')
const { getAll, postPetition, getId } = require('../Controllers/controllerPetitionGet.js')

const router = Router()

router.get('/', getAll)
router.get('/:userId', getId)
router.post('/', postPetition)

module.exports = router
