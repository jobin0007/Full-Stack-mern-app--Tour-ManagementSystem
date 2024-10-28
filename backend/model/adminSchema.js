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
    minlength:6
}


},{timestamps:true})

const Admin = mongoose.model('User',adminScehma)
module.exports = Admin