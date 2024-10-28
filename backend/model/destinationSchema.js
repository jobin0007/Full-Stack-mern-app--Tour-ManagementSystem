const mongoose = require('mongoose')
const destinationScehma =new mongoose.Schema({
name:{
    type:String,
    require:true,
    trim:true,
},
description:{
    type:String,
    require:true,
    trim:true,
    unique:true
},
location:{
    type:String,
    require:true,
    minlength:6
}
},{timestamps:true})

const Destination = mongoose.model('Destination',destinationScehma)
module.exports = Destination