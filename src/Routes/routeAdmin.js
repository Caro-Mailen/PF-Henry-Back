const { Router } = require('express')
const { getToken, getPet, getPetLost, loadPet, addAdmin, setRating } = require('../Controllers/controllerAdmin.js')
const { isAdmin } = require('../Middleware/isAdmin.js')

const router = Router()

router.put('/', getToken)
router.post('/petitionGet/:action', isAdmin, getPet)
router.post('/petitionGetLost/:action', isAdmin, getPetLost)
router.post('/petitionLoadPet/:action', isAdmin, loadPet)
router.put('/addAdmin', isAdmin, addAdmin)
<<<<<<< HEAD
=======
router.put('/rating', isAdmin, setRating)
>>>>>>> 7903a3d88cbe5c1e63472d2e6fd6e66b328db058

module.exports = router
