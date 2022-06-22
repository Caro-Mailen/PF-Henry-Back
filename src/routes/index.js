const { Router } = require('express');
const { Pet, Type } = require('../db.js');

const router = Router();

router.get('/',(req, res) => {
    Pet.findAll().then(r=>res.send(r));
})

module.exports = router;
