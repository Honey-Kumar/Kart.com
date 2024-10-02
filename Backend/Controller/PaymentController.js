const CatchAsyncError = require("../Middlewares/CatchAsyncError")
const razorpay = require("razorpay")
const { Razorpayapi, Razorpaysecretkey } = require("../config/index")
const crypto = require("crypto");
const ErrorHandler = require("../utils/ErrorHandler")


const instance = new razorpay({
    key_id: Razorpayapi,
    key_secret: Razorpaysecretkey
})

const PaymentOrderCreate = CatchAsyncError(async (req, res, next) => {

    const { amount } = req.body
    console.log('backend amount', amount)
    const option = {
        amount: amount * 100,
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
        payment_capture: 1,
    }

    try {
        const response = await instance.orders.create(option);
        console.log(response)
        return res.status(200).json({
            success: true,
            order: response.id,
            ...response
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }

})

const PaymentVerification = CatchAsyncError(async (req, res, next) => {
    const { razorpay_orderID,
        razorpay_paymentID,
        razorpay_signature } = req.body

    console.log('Verifying payment', razorpay_orderID,
        razorpay_paymentID,
        razorpay_signature)

    const hashsignature = crypto.createHmac('sha256', Razorpaysecretkey).update(razorpay_orderID + '|' + razorpay_paymentID).digest('hex');
    if (hashsignature === razorpay_signature) {

        // Fetch the payment details from Razorpay using the payment ID
        const payment = await instance.payments.fetch(razorpay_paymentID);
        console.log('payment is ', payment)

        const paymentDetails = {
            id: payment.id,
            status: payment.status,  // Should be 'captured' for successful payments
            method: payment.method,  // Payment method (e.g., card, netbanking)
        };
        return res.status(200).json({
            success: true,
            message: "Payment Successfull",
            payment: paymentDetails
        })
    } else {
        return next(new ErrorHandler("Payment not verified due to Invalid Signature", 400))
    }
})

module.exports = { PaymentOrderCreate, PaymentVerification }