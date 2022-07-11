/* eslint-disable new-cap */
const { Router } = require('express')
const router = Router()

const controllerService = require('../Services/controllerService')
const servicePayments = require('../Services/servicesPayments')

const PaymentInstance = new controllerService(new servicePayments())

router.post('/', function (req, res, next) {
  PaymentInstance.getPaymentLink(req, res)
})

router.post('/subscription', function (req, res, next) {
  PaymentInstance.getSubscriptionLink(req, res)
})

module.exports = router
