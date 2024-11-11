const mongoose = require('mongoose')
const tourScehma = new mongoose.Schema({
    tourOperatorId: { 
        type: Object, 
        ref: 'TourOperator',
         required: true },
    
    title: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true,
        trim: true

    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    destinations: {
        type: String,
        require: true
    },
    duration: {
        type: String,
        require: true,
        trim: true

    },
    price: {
        type: Number,
        require: true,
        trim: true

    },
    availableSpots: {
        type: Number,
        required: true
    },
    bookingStatus:{
        type:String,
        enum: ['booked', 'not-booked'],
        default:'not-booked'
    }

}, { timestamps: true })

const Tour = mongoose.model('Tour', tourScehma)
module.exports = Tour
