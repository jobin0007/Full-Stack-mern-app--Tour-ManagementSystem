const mongoose = require('mongoose')
const cutomizedToursScehma =new mongoose.Schema({
request_date:{
    type:Date,
    require:true,
    trim:true,
},
customized_tours_details:{
    type:Object,
    require:true,
    trim:true,
},
mobile_number:{
    type:Number,
    require:true,
    unique:true
}
},{timestamps:true})

const CustomizedTours = mongoose.model('CustomizedTours',cutomizedToursScehma)
module.exports = CustomizedTours