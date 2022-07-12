const { Router } = require('express')
const {seguimiento, getSeg, trackingById, getSegUlt5} = require('../Controllers/controllerSeguimiento.js')

const router = Router()

router.get('/', getSeg)
router.get('/ult5', getSegUlt5)
router.get('/:id', trackingById)
router.post('/', seguimiento)


module.exports = router