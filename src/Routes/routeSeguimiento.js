const { Router } = require('express')
const {seguimiento, getSeg, trackingById} = require('../Controllers/controllerSeguimiento.js')

const router = Router()

router.get('/', getSeg)
router.get('/:id', trackingById)
router.post('/', seguimiento)

module.exports = router