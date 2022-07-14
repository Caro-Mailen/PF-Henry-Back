const { decode } = require('jsonwebtoken')
const { Donation, User } = require('../db.js')
const { mail } = require('../Controllers/nodemailer')
const moment = require('moment')

class PaymentController {
  constructor (subscriptionService) {
    this.subscriptionService = subscriptionService
  }

  async getPaymentLink (req, res) {
    try {
      const newDonation = await Donation.create({ amount: req.body.unit_price, date: moment().format('DD/MM/YYYY'), type: 'regular_payment' })
      const id = newDonation.id

      const payment = await this.subscriptionService.createPayment(req, id)

      const user = decode(req.body.token)
      // console.log(user)

      const userFind = await User.findOne({
        where: { email: user.email }
      })
      // console.log(userFind.id)

      await userFind.addDonations(newDonation)

      mail(user.email, `'Gracias por tu donacion ${user.name}'`, '<img src="https://i.postimg.cc/NfXv2x5V/poster-agradecimiento.png" alt="AQUI VA UNA IMAGEN">')

      return res.json({ url: payment.init_point })
    } catch (error) {
      console.log(error)

      return res
        .status(500)
        .json({ error: true, msg: 'Failed to create payment' })
    }
  }

  async getSubscriptionLink (req, res) {
    const user = decode(req.body.token)

    const userFind = await User.findOne({
      where: { email: user.email }
    })
    const allDonation = await Donation.findAll({
      where: {
        UserId: userFind.id
      }
    })
    const data = allDonation.map((e) => e.dataValues.type)
    // console.log(allDonation.map((e) => e.dataValues.type))
    if (data.includes('suscripcion ')) {
      return res.status(400).send('este usuario ya esta suscripto')
    }
    try {
      const subscription = await this.subscriptionService.createSubscription(req)
      const newSubscription = await Donation.create({
        amount: req.body.transaction_amount,
        date: moment().format('DD/MM/YYYY'),
        type: subscription.reason
      })
      const id = newSubscription.id

      // console.log(userFind.id)

      await userFind.addDonations(newSubscription)

      // console.log(subscription)
      mail(user.email, `'${user.name} gracias por suscribirte!'`, '<img src="https://i.postimg.cc/NfXv2x5V/poster-agradecimiento.png" alt="AQUI VA UNA IMAGEN">')

      return res.json({ url: subscription.init_point, id })
    } catch (error) {
      console.log(error)

      return res
        .status(500)
        .json({ error: true, msg: 'Failed to create subscription' })
    }
  }
}

module.exports = PaymentController
