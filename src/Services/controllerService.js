class PaymentController {
  constructor (subscriptionService) {
    this.subscriptionService = subscriptionService
  }

  async getPaymentLink (req, res) {
    try {
      const payment = await this.subscriptionService.createPayment(req)

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
