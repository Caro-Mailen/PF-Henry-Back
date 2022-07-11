const { Router } = require('express')
const { getToken, getPet, getPetLost, loadPet } = require('../Controllers/controllerAdmin.js')
const { isAdmin } = require('../Middleware/isAdmin.js')

const router = Router()

router.get('/', getToken)
router.post('/petitionGet/:action', isAdmin, getPet)
router.post('/petitionGetLost/:action', isAdmin, getPetLost)
router.post('/petitionLoadPet/:action', isAdmin, loadPet)

module.exports = router
