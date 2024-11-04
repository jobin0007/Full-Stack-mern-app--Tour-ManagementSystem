const mongoose = require('mongoose')
const tourOpratorScehma =new mongoose.Schema({
    role:{
        type:String,
        require:true,
        default:'tour-operator'
    
          
    },
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
password:{
    type:String,
    require:true,
    minlength:6
},
mobile_number:{
    type:Number,
    require:true,
    unique:true
},
addresss:{
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