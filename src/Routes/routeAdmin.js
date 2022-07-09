const { Router } = require('express')
const { getToken, getPet } = require('../Controllers/controllerAdmin.js')
const { isAdmin } = require('../Middleware/isAdmin.js')

const router = Router()

router.get('/', getToken)
router.get('/petitionGet/:action', isAdmin, getPet)
// router.get('/petitionGetLost/:action', isAdmin, getPetLost)
// router.get('/petitionPost/:action', isAdmin, postPet)

module.exports = router
