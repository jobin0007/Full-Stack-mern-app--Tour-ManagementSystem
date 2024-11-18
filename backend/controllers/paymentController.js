const asyncHandler = require('express-async-handler')
const Bookings = require('../model/bookingsSchema')
const createRazorpayInstance = require('./razorPayConfig')
const crypto = require('crypto')


require('dotenv').config()


const paymentController = {

    createOrder: asyncHandler(async (req, res) => {
        const userId = req.user

        const { bookingId } = req.params
        if (!userId) {
            throw new Error("Authenticaton Failed")
        }

        // Fetch booking details to get the amount
        const booking = await Bookings.findById(bookingId);
        if (!booking) {
            throw new Error("Booking not found")
        }
        // Create a new order
        const orderPrice = booking.total_price
        const options = {
            amount: orderPrice,  // amount in smallest currency unit
            currency: 'INR',
            receipt: `receipt_${bookingId}`
        };
        const order = await createRazorpayInstance.orders.create(options);
        if (!order) {
            throw new Error("payment error found")
        }
        res.status(201).json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt

        });

    }
    ),
    mockSignature: asyncHandler(async (req, res) => {
        const userId = req.user
        if (!userId) {
            throw new Error("user not found")
        }
        const { order_id } = req.body;  // Make sure to send the order_id from Step 1 in the request body
        const mockPaymentId = 'pay_test_paymentid';  // Mock payment ID for testing

        // Generate a mock signature
        const secret = process.env.RAZORPAY_KEY_SECRET;
        const generatedSignature = crypto.createHmac('sha256', secret)
            .update(`${order_id}|${mockPaymentId}`)
            .digest('hex');
        console.log(order_id)
        // Respond with mock data
        res.json({
            success: true,
            razorpay_order_id: order_id,
            razorpay_payment_id: mockPaymentId,
            razorpay_signature: generatedSignature
        });
    }),
    verifyPayment: asyncHandler(async (req, res) => {
        const userId = req.user
        if (!userId) {
            throw new Error("user not found")
        }


        const { razorpay_order_id, razorpay_payment_id, razorpay_signature,bookingId } = req.body;
        const secret = process.env.RAZORPAY_KEY_SECRET;
        // Verify signature to ensure payment is authentic
        const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');
        const signature = crypto.createHmac('sha256', secret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');
        console.log("Signature:", signature);

        if (generatedSignature === razorpay_signature) {
            // Save payment details to the database, mark booking as paid
            await Bookings.findByIdAndUpdate(req.body.bookingId, { status: 'paid' });
            res.json({
                success: true,
                message: 'Payment verified successfully'

            })


            await Bookings.findByIdAndUpdate( bookingId,
                { payment_status: "paid" },
                { new: true })
        } else {
            throw new Error('Payment verification failed')

        }




    })

}
module.exports = paymentController