const { Router } = require('express');
const {UPPut, UPGetId} = require('../Controllers/controllerUSerPet')
//  Importar todos los routers;
// /Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/:userId', UPGetId)
router.put('/', UPPut)

module.exports = router;