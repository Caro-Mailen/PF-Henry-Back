const { Router } = require('express')
const { getToken, getPet, getPetLost, loadPet, addAdmin, setRating } = require('../Controllers/controllerAdmin.js')
const { isAdmin } = require('../Middleware/isAdmin.js')

const router = Router()

router.put('/', getToken)
router.post('/petitionGet/:action', isAdmin, getPet)
router.post('/petitionGetLost/:action', isAdmin, getPetLost)
router.post('/petitionLoadPet/:action', isAdmin, loadPet)
router.put('/addRemove', isAdmin, addAdmin)
router.put('/rating', isAdmin, setRating)

module.exports = router
