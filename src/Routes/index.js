const { Router } = require('express');

const { Pet } = require('../db.js');
// const pets = require('./routePets')
// const donation = require('./routeDonation')
//const user = require('./routeUser')



const router = Router();

router.get('/pets',(req, res) => {
    Pet.findAll().then(r=>res.send(r));
})

router.get('/pet',(req, res) => {
    const{name} = req.query
    Pet.findOne({where:{name:name}}).then(r=>res.send(r))
})


router.get('/pet/:id',(req, res) => {
    const{id} = req.params
    Pet.findByPk(id).then(r=>res.send(r))
})
// router.use('/pets', pets)
// router.use('/donation', donation)
// router.use('/user', user)

module.exports = router;
