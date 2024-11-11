const mongoose = require('mongoose')
const reviewScehma =new mongoose.Schema({
    user: {
        type:Object,
        ref: 'Users',
        required: true
    },
    tour: {
        type:Object,
        ref: 'Tour',
        required: true
    },
    tourOperator: {
        type: Object,
        ref: 'TourOperator',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        maxlength: 500
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

},{timestamps:true})

const Review = mongoose.model('Review',reviewScehma)
module.exports = Review