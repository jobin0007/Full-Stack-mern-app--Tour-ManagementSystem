const mongoose = require('mongoose')
const bookingsScehma =new mongoose.Schema({
booking_date:{
    type:Date,
    require:true,
    trim:true,

},
start_date:{
    type:Date,
    require:true,
    trim:true,

},
end_date:{
    type:Date,
    require:true,
    trim:true,

}
},{timestamps:true})

const Bookings = mongoose.model('User',bookingsScehma)
module.exports = Bookings