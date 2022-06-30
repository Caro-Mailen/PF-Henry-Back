const { Router } = require('express')
const { userLogin, userRegister, user} = require('../Controllers/controllerUser')
//  Importar todos los routers;
// /Ejemplo: const authRouter = require('./auth.js');

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.get('/:userId', userId)
router.get('/', user)
router.post('/', userRegister)
router.post('/', userLogin)

module.exports = router
