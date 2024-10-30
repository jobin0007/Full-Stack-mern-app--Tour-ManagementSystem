const mongoose = require('mongoose')
const adminScehma =new mongoose.Schema({


name:{
    type:String,
    require:true,
    trim:true,
    minlength:3
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

},
mobile_number:{
    type:Number,
    require:true
},
role:{
    type:String,
    default:'admin'
}


},{timestamps:true})

const Admin = mongoose.model('Admin',adminScehma)
module.exports = Admin