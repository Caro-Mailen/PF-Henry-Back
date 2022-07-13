const { decode } = require('jsonwebtoken')
const { Donation, User } = require('../db.js')
const { transporter } = require('../Controllers/nodemailer')

class PaymentController {
  constructor (subscriptionService) {
    this.subscriptionService = subscriptionService
  }

  async getPaymentLink (req, res) {
    try {
      const payment = await this.subscriptionService.createPayment(req)
      // console.log(payment)

      const newDonation = await Donation.create({ amount: req.body.unit_price, date: payment.date_created, type: payment.operation_type })

      const user = decode(req.body.token)
      // console.log(user)

      const userFind = await User.findOne({
        where: { email: user.email }
      })
      console.log(userFind.id)

      // if (userFind.length) {
      // newDonation.addUser([userFind.id])
      await userFind.addDonations(newDonation)
      // }

      const correo = await transporter.sendMail({
        from: '"AdoptA 🐶🐱" <adopta@gmail.com>',
        to: user.email,
        subject: `¡Gracias ${user.name} !`,
        html: `
        <img src="https://i.postimg.cc/NfXv2x5V/poster-agradecimiento.png" alt="AQUI VA UNA IMAGEN">
        `
      })

      console.log('Message sent: %s', correo.messageId)

      return res.json({ url: payment.init_point })
    } catch (error) {
      console.log(error)

      return res
        .status(500)
        .json({ error: true, msg: 'Failed to create payment' })
    }
  }

  async getSubscriptionLink (req, res) {
    try {
      const subscription = await this.subscriptionService.createSubscription(req)
      const newSubscription = await Donation.create({
        amount: req.body.transaction_amount,
        date: subscription.date_created,
        type: subscription.reason
      })
      const user = decode(req.body.token)

      const userFind = await User.findOne({
        where: { email: user.email }
      })
      // console.log(userFind.id)

      await userFind.addDonations(newSubscription)

      // console.log(subscription)

      const correo = await transporter.sendMail({
        from: '"AdoptA 🐶🐱" <adopta@gmail.com>',
        to: user.email,
        subject: `¡${user.name} Gracias por suscribirte!`,
        html: `
        <img src="https://i.postimg.cc/NfXv2x5V/poster-agradecimiento.png" alt="AQUI VA UNA IMAGEN">
        `
      })

      console.log('Message sent: %s', correo.messageId)

      return res.json({ url: subscription.init_point })
    } catch (error) {
      console.log(error)

      return res
        .status(500)
        .json({ error: true, msg: 'Failed to create subscription' })
    }
  }
}

module.exports = PaymentController
