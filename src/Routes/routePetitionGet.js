const { Router } = require('express')
const { getAll, postPetition, getId, postPetitionLost, deletePetition, deletePetitionLost } = require('../Controllers/controllerPetitionGet.js')

const router = Router()

router.get('/', getAll)
router.get('/:userId', getId)
router.post('/', postPetition)
router.post('/lost', postPetitionLost)
router.delete('/delete/:petitionid', deletePetition)
router.delete('/deleteLost/:petitionid', deletePetitionLost)

module.exports = router
