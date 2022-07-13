const { decode } = require('jsonwebtoken')
const { Donation, User } = require('../db.js')
const { mail } = require('../Controllers/nodemailer')

class PaymentController {
  constructor (subscriptionService) {
    this.subscriptionService = subscriptionService
  }

  async getPaymentLink (req, res) {
    try {
      const payment = await this.subscriptionService.createPayment(req)
      // console.log(payment)

      const newDonation = await Donation.create({ amount: req.body.unit_price, date: payment.date_created, type: payment.operation_type })
      const id = newDonation.id

      const user = decode(req.body.token)
      // console.log(user)

      const userFind = await User.findOne({
        where: { email: user.email }
      })
      // console.log(userFind.id)

      // if (userFind.length) {
      // newDonation.addUser([userFind.id])
      await userFind.addDonations(newDonation)
      // }
      mail(user.email, `'Gracias por tu donacion ${user.name}'`, '<img src="https://i.postimg.cc/NfXv2x5V/poster-agradecimiento.png" alt="AQUI VA UNA IMAGEN">')

      // eslint-disable-next-line no-unused-vars
      // const correo = await transporter.sendMail({
      //   from: '"Patitas 🐾" <adopta@gmail.com>',
      //   to: user.email,
      //   subject: `¡Gracias ${user.name} !`,
      //   html: `
      //   <img src="https://i.postimg.cc/NfXv2x5V/poster-agradecimiento.png" alt="AQUI VA UNA IMAGEN">
      //   `
      // })

      // console.log('Message sent: %s', correo.messageId)

      return res.json({ url: payment.init_point, id })
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
      console.log('hola')
      return res.status(400).send('este usuario ya esta suscripto')
    }
    try {
      const subscription = await this.subscriptionService.createSubscription(req)
      const newSubscription = await Donation.create({
        amount: req.body.transaction_amount,
        date: subscription.date_created,
        type: subscription.reason
      })
      const id = newSubscription.id

      // console.log(userFind.id)

      await userFind.addDonations(newSubscription)

      // console.log(subscription)
      mail(user.email, `'${user.name} gracias por suscribirte!'`, '<img src="https://i.postimg.cc/NfXv2x5V/poster-agradecimiento.png" alt="AQUI VA UNA IMAGEN">')

      // eslint-disable-next-line no-unused-vars
      // const correo = await transporter.sendMail({
      //   from: '"Patitas 🐾" <adopta@gmail.com>',
      //   to: user.email,
      //   subject: `¡${user.name} Gracias por suscribirte!`,
      //   html: `
      //   <img src="https://i.postimg.cc/NfXv2x5V/poster-agradecimiento.png" alt="AQUI VA UNA IMAGEN">
      //   `
      // })

      // console.log('Message sent: %s', correo.messageId)

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
