// aca las rutas controladoras de las rutas Donation
const { User } = require('../db.js')

const donation = async (req, res, next) => {
  try {
    const { userId, amount } = req.body
    if (!userId || !amount) return res.status(400).send('please insert require fields to continue')
    const user = await User.findByPk(userId)
    if (!user) return res.status(400).send('user not found')
    await user.addDonations(amount)
    res.send('the donation was made')
  } catch (error) {
    next(error)
  }
}

module.exports = {
  donation
}
