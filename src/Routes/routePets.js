const { Router } = require('express');
const {pet,petId,petName,petPost} = require('../Controllers/controllerPets')
//  Importar todos los routers;
// /Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', petName)
router.get('/', pet)
router.get('/:id', petId)
router.post('/', petPost)


module.exports = router;
