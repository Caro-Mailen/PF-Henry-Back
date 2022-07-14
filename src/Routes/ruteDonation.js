const { Router } = require('express')
const { Donation } = require('../db.js')

const router = Router()

// // Configurar los routers
// // Ejemplo: router.use('/auth', authRouter);
router.get('/', async (req, res) => {
  const donationData = await Donation.findAll()
  // console.log(donationData)
  res.send(donationData)
})

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    console.log(req.params)
    await Donation.destroy(
      {
        where: {
          id
        }
      }
    )
    res.status(200).send('subscription canceled successfully')
  } catch (error) {
    next(error)
  }
})

module.exports = router
