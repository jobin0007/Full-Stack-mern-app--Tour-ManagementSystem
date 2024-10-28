const mongoose = require('mongoose')
const userScehma =new mongoose.Schema({
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
},
address:{
    type:String,
    require:true
},
mobile_number:{
    type:Number,
    require:true,
    unique:true
}
},{timestamps:true})

const User = mongoose.model('User',userScehma)
module.exports = User

    
