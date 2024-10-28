const mongoose = require('mongoose')
const activitiesScehma =new mongoose.Schema({

    
name:{
    type:String,
    require:true,
    trim:true,
},
description:{
    type:String,
    require:true,
    trim:true,
},



},{timestamps:true})

const Activities = mongoose.model('Activities',activitiesScehma)
module.exports = Activities