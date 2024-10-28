const mongoose = require('mongoose')
const paymentScehma = new mongoose.Schema({

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
    payment_method:{
        type:String,
        require:true
    }
    
},{timestamps:true})
const Payment = mongoose.model('Payment',paymentScehma)
module.exports = Payment