const mongoose = require('mongoose')
const bookingsScehma = new mongoose.Schema({
    tourId: {
        type: Object,
        ref: 'Tour',
        required: true
    },
    userId: {
        type: Object,
        ref: 'Users',
        required: true
    },
    tourOperatorId: {
        type: Object,
        ref: 'TourOperator',
        required: true
    },
    total_price:
     { type: Number,
        ref:'Tour',
     required: true },

    booking_date: {
        type: Date,
        require: true,
        default:Date.now

    },
  
    bookingDetails:
     { type: String },
     booking_status:{
        type: String,
        enum: ['accepted', 'rejected', 'pending'], 
        default: 'pending'

     },
    payment_status: { type: String,
         enum: ['pending', 'paid', 'not-paid'], 
         default: 'pending' },

    acceptanceDate: { type: Date }
}, { timestamps: true })

const Bookings = mongoose.model('Bookings', bookingsScehma)
module.exports = Bookings