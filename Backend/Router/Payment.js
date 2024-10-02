const express = require("express")
const { PaymentOrderCreate, PaymentVerification } = require("../Controller/PaymentController")
const { Authentication } = require("../Middlewares/Authentication")
const PaymentRouter = express.Router()

PaymentRouter.route('/payment/create/order').post(Authentication, PaymentOrderCreate)
PaymentRouter.route('/payment/verify').post(Authentication, PaymentVerification)

module.exports = PaymentRouter