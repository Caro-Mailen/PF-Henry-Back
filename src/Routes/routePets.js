const { Router } = require('express')
const {
  pet,
  petId,
  petName,
  petPost,
  countPets,
  petDelete,
  petState,
  petReturn,
  petUpdate
} = require('../Controllers/controllerPets')
//  Importar todos los routers;
// /Ejemplo: const authRouter = require('./auth.js');

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.put('/', pet)
// Gente, tuvimos que cambiarlo a put, porque los get no pueden recibir body
// (si hubieramos usado post tenia conflicto con petPost, con los otros dos no porque reciben id por params.)
router.get('/', petName)
router.put('/return', petReturn)
router.get('/count', countPets)
router.get('/:id', petId)
router.post('/', petPost)
router.put('/update/:id', petUpdate)
router.put('/:id/:state', petState)
router.put('/:id', petDelete)

module.exports = router
