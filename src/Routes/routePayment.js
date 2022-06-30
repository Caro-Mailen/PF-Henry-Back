const { Router } = require("express");
const router = express.Router();

const controllerService = require("../Controllers/controllerService");
const servicePayments = require("../Services/servicesPayments");

const PaymentInstance = new controllerService(new servicePatment());

router.get("/", function (req, res, next) {
    return res.json({
        "/payment": "generates a payment link",
        "/subscription": "generates a subscription link"
    });
});

router.get("/payment", function (req, res, next) {
    PaymentInstance.getPaymentLink(req, res);
});

router.get("/subscription", function (req, res, next) {
    PaymentInstance.getSubscriptionLink(req, res);
});

module.exports = router;