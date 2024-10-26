const mongoose = require('mongoose')
const userScehma =new mongoose.Schema({
name:{
    type:String,
    require:true
},
email:{
    type:String,
    require:true
},
password:{
    type:String,
    require:true
},
address:{
    type:String,
    require:true
},
mobile_number:{
    type:Number,
    require:true
}



})

const User = mongoose.model('User',userScehma)
module.exports = User

    
