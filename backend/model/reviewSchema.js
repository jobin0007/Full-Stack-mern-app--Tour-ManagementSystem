const mongoose = require('mongoose')
const reviewScehma =new mongoose.Schema({
rating:{
    type:Number,
    require:true,
    trim:true,
  
},
review:{
    type:String,
    require:true,
    trim:true,
    
},

},{timestamps:true})

const Review = mongoose.model('Review',reviewScehma)
module.exports = Review