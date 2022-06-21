const { Router } = require('express');
const { pet, type } = require('../db.js');

const router = Router();

router.get('/',(req, res) => {
    pet.findAll().then(r=>res.send(r));
})

module.exports = router;
