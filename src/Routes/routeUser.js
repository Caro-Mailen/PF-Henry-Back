const { Router } = require('express')
const { userLogin, userRegister } = require('../Controllers/controllerUser')
//  Importar todos los routers;
// /Ejemplo: const authRouter = require('./auth.js');

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.get('/:userId', userId)
// router.get('/', user)
router.post('/', userLogin)
router.post('/', userRegister)

module.exports = router
