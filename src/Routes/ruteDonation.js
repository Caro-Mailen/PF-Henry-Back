const { Router } = require('express')
const { donation } = require('../Controllers/controllerDonation')
//  Importar todos los routers;
// /Ejemplo: const authRouter = require('./auth.js');

const router = Router()

// // Configurar los routers
// // Ejemplo: router.use('/auth', authRouter);
router.post('/', donation)
// router.get('/:id', userId)

module.exports = router
