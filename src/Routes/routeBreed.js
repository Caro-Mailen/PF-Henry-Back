const { Router } = require('express');
const { breed } = require('../Controllers/controllerBreed.js')

const router = Router();

router.get('/',breed)

module.exports = router;