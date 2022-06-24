const { Router } = require('express');
const {user,userPost,userId} = require('../Controllers/controllerUser')
//  Importar todos los routers;
// /Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/:userId', userId)
router.get('/', user)
router.post('/', userPost)

module.exports = router;