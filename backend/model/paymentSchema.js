const mongoose = require('mongoose')
const paymentScehma = new mongoose.Schema({


    user: {
        type: Object,
        ref: 'Users',
        required: true
    },
    booking: {
        type: Object,
        ref: 'Bookings',
        required: true
    },
    

    payment_date:{
        type:Date,
        require:true,
        trim:true
    
    },
    amount:{
        type:Number,
        require:true,
        trim:true
    
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'paypal', 'bank_transfer', 'cash'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    
},{timestamps:true})
const Payment = mongoose.model('Payment',paymentScehma)
module.exports = Payment