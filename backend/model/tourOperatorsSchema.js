const mongoose = require('mongoose')
const tourOpratorScehma =new mongoose.Schema({
name:{
    type:String,
    require:true,
    trim:true
},
email:{
    type:String,
    require:true,
    trim:true,
    unique:true
},
mobile_number:{
    type:Number,
    require:true,
    unique:true
},
address:{
    type:String,
    require:true
},
commission_rate:{
    type:Number,
    require:true
}
},{timestamps:true})

const TourOperator = mongoose.model('TourOperator',tourOpratorScehma)
module.exports = TourOperator