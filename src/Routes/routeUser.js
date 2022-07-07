const { Router } = require('express')
const { userLogin, userRegister, user, userLoginGoogle, userToken, userAll } = require('../Controllers/controllerUser')
//  Importar todos los routers;
// /Ejemplo: const authRouter = require('./auth.js');

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.get('/:userId', userId)
router.get('/', user)
router.get('/all', userAll)
router.get('/:token', userToken)
router.post('/register', userRegister)
router.post('/login', userLogin)
router.post('/loginGoogle', userLoginGoogle)
// router.get('/logout', logout)

module.exports = router
