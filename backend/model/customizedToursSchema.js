const mongoose = require('mongoose')
const cutomizedToursScehma =new mongoose.Schema({
    name: { type: String,
         required: true },
    description: { type: String, 
        required: true },
    date: { type: Date,
         required: true },
    price: { type: Number,
         required: true },
    participants: { type: Number,
         required: true },
},{timestamps:true})

const CustomizedTours = mongoose.model('CustomizedTours',cutomizedToursScehma)
module.exports = CustomizedTours