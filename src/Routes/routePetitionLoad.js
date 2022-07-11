const { Router } = require('express')
const {postPetition, deletePetitionLoad, getAll} = require('../Controllers/controllerPetitionLoad.js')

const router = Router()

router.get('/',getAll)
router.post('/', postPetition)
router.delete('/:id',deletePetitionLoad)

module.exports = router