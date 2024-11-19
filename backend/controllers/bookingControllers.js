const asyncHandler = require('express-async-handler')
const Tour = require('../model/tourSchema')
const Bookings = require('../model/bookingsSchema')
const tourOperatorRoutes = require('../routes/tourOperatorRoutes')
const Users = require('../model/userSchema')
const bookingController = {
    createBooking: asyncHandler(async (req, res) => {
        const {id} = req.user
        const { foundTourId } = req.params
        const { start_date, end_date } = req.body
        if (!id) {
            throw new Error("User Not Found")
        }
        if (!start_date || !end_date) {
            throw new Error("Please Give All Fields")
        }

        const foundTour = await Tour.findOne({ _id: foundTourId })
     
        if (!foundTour) {
            throw new Error("No Tours Available Now")
        }

        const foundTourOperatorId = foundTour.tourOperatorId
 
        const foundPrice = foundTour.price
      
        if (foundTour.bookingStatus !== 'not-booked' && foundTour.status !== 'active') {
            throw new Error("Tour Already Booked .Otherwise It Is Not Active Now")
        }
        const existingTourRequest = await Bookings.findOne({ userId:id })
        
        if (existingTourRequest) {
            throw new Error("You Have Already A Pending Tour Request. Please Try After Cancel It")
        }

        const userDetail= await Users.findOne({id})
        const createBooking = await Bookings.create({

            tourId: foundTourId,
            tourOperatorId: foundTourOperatorId,
            userId: id,
            userName:userDetail.name,
            userMobileNumber:userDetail.mobile_number,
            start_date,
            end_date,
            total_price: foundPrice


        })
   
        await Tour.findByIdAndUpdate(foundTourId, { bookingStatus: 'booked' })
        await Tour.findByIdAndUpdate(foundTourId, { status: 'inactive' })
        if (!createBooking) {
            throw new Error(" Tour not Booked")
        }
    
        res.json({
            message: "Tour Booked ",
            createBooking
        })
    }),
    getAllBooking: asyncHandler(async (req, res) => {
        const tourOperatorId = req.tourOperator
        if (!tourOperatorId) {
            throw new Error("TourOperator")
        }
        const allBookings = await Bookings.find({ status: 'pending' }).populate('userId', 'name mobile_number email')
        if (!allBookings) {
            throw new Error("No Bookings Found")
        }
        res.json({
            message: "All Bookings Here :",
            allBookings
        })



    }),
    getOneBooking:asyncHandler(async(req,res)=>{
        const tourOperatorId = req.tourOperator
         const {bookingId} = req.params
        if(!tourOperatorId){
            throw new Error("")  
        }
        if(!bookingId){
            throw new Error("Please Give Required Fields")
        }
        const foundBooking = await Bookings.findById(bookingId)
        if(!foundBooking){
            throw new Error("There is no Booking For this given Id")

        }
        res.json({
            message:"booking found successfully",
            foundBooking
        })
    })

}
module.exports = bookingController