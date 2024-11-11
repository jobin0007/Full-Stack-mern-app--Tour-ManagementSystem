const mongoose = require('mongoose')
const cutomizedToursScehma =new mongoose.Schema({
     userId: { type: Object, 
          ref: 'Users',
           required: true },
    title: { type: String,
         required: true },
    description: { type: String, 
        required: true },
        start_date: {
          type: Date,
          require: true,
  
      },
      end_date: {
          type: Date,
          require: true,
  
      },
    
    date: { type: Date,
         required: true,
         default: Date.now },
    budget: { type: Number,
         required: true },
    participants: { type: Number,
         required: true },
         status: { 
          type: String, 
          enum: ['pending', 'accepted', 'declined'], 
          default: 'pending' 
      },
},{timestamps:true})

const CustomizedTours = mongoose.model('CustomizedTours',cutomizedToursScehma)
module.exports = CustomizedTours