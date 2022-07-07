const { Router } = require('express')
const { getAll, postPetition, getId, postPetitionLost } = require('../Controllers/controllerPetitionGet.js')

const router = Router()

router.get('/', getAll)
router.get('/:userId', getId)
router.post('/', postPetition)
router.post('/lost', postPetitionLost)

module.exports = router
