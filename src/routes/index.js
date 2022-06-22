const { Router } = require('express');
const { pet, type } = require('../db.js');
// const pets = require('./routePets')
// const donation = require('./routeDonation')
//const user = require('./routeUser')


const router = Router();

router.get('/',(req, res) => {
    pet.findAll().then(r=>res.send(r));
})


// router.use('/pets', pets)
// router.use('/donation', donation)
// router.use('/user', user)

module.exports = router;
