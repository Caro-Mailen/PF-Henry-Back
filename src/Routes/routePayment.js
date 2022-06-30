const { Router } = require('express')
const router = Router()

const PaymentController = require('../Controllers/PaymentController')
const PaymentService = require('../Services/PaymentService')

const PaymentInstance = new PaymentController(new PaymentService())

// router.get('/', function (req, res, next) {
//   return res.json({
//     '/payment': 'generates a payment link',
//     '/subscription': 'generates a subscription link'
//   })
// })

router.get('/', function (req, res, next) {
  PaymentInstance.getPaymentLink(req, res)
})

router.get('/subscription', function (req, res, next) {
  PaymentInstance.getSubscriptionLink(req, res)
})

module.exports = router
