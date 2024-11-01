const mongoose = require('mongoose')
const tourScehma = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true,
        trim: true

    },
    duration: {
        type: Number,
        require: true,
        trim: true

    },
    price: {
        type: Number,
        require: true,
        trim: true

    },
    availableSpots: { type: Number, 
        required: true },

}, { timestamps: true })

const Tour = mongoose.model('Tour', tourScehma)
module.exports = Tour