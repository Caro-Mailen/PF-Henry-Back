const { decode } = require('jsonwebtoken')
const { Donation } = require('../db.js')

class PaymentController {
  constructor (subscriptionService) {
    this.subscriptionService = subscriptionService
  }

  async getPaymentLink (req, res) {
    try {
      const payment = await this.subscriptionService.createPayment(req)

      const user = decode(req.params.token)
      console.log(user)
      await Donation.create({ amount: req.body.unit_price, date: payment.date_created, type: payment.operation_type })
      console.log(payment)

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
      await Donation.create({ amount: subscription.auto_rrecurring.transaction_amount, date: subscription.date_created, type: subscription.reason })

      console.log(subscription)

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
