const { Router } = require('express')
const { Donation } = require('../db.js')
// const { decode } = require('jsonwebtoken')

//  Importar todos los routers;
// /Ejemplo: const authRouter = require('./auth.js');

const router = Router()

// // Configurar los routers
// // Ejemplo: router.use('/auth', authRouter);
router.get('/', async (req, res) => {
  // const user = decode(req.body.token)
  // console.log(user)
  const donationData = await Donation.findAll()
  // console.log(donationData)
  res.send(donationData)
  //   const { token } = req.body
  //   console.log(req.body)

//   Donation.findAll({ where: { email: decode(token).email } }).then(user => {
//     res.send(user)
})
// })
// router.get('/:id', userId)

module.exports = router
