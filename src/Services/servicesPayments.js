const axios = require('axios')

class PaymentService {
  async createPayment (req) {
    const url = 'https://api.mercadopago.com/checkout/preferences'

    const body = {
      items: [
        {
          title: `Donación: ${req.body.unit_price}`,
          quantity: 1,
          unit_price: req.body.unit_price
        }
      ],
      back_urls: {
        failure: req.body.failure,
        pending: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        success: req.body.success
      }
    }

    const payment = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    })

    return payment.data
  }

  async createSubscription (req) {
    const url = 'https://api.mercadopago.com/preapproval'

    const body = {
      reason: 'Donas por mes: ',
      auto_recurring: {
        frequency: 1,
        frequency_type: 'months',
        transaction_amount: req.body.transaction_amount,
        currency_id: 'ARS'
      },
      back_url: req.body.back_url,
      payer_email: req.body.payer_email
    }

    const subscription = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    })

    return subscription.data
  }
}

module.exports = PaymentService
