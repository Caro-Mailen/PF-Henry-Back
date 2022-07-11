const { Router } = require('express')
const { getAll, postPetition, getId, postPetitionLost, deletePetition, deletePetitionLost } = require('../Controllers/controllerPetitionGet.js')

const router = Router()

router.get('/', getAll)
router.get('/:userId', getId)
router.post('/', postPetition)
router.post('/lost', postPetitionLost)
router.delete('/delete/:id', deletePetition)
router.delete('/deleteLost/:id', deletePetitionLost)

module.exports = router
