const express = require('express')
const bookingController = require('../controllers/bookingControllers')
const authentication = require('../middleware/authenticator')
const bookingRoutes = express.Router()



bookingRoutes.put('/create_booking/:foundTourId',authentication,bookingController.createBooking)
bookingRoutes.get('/get_all_bookings',authentication,bookingController.getAllBooking)
bookingRoutes.get('/get-one-booking',authentication,bookingController.getOneBooking)
bookingRoutes.get('/get-user-bookings/:userId',authentication,bookingController.getUserBookings)
bookingRoutes.put('/accept-booking/:bookingId',authentication,bookingController.acceptBooking)
bookingRoutes.put('/reject-booking/:bookingId',authentication,bookingController.rejectBooking)
bookingRoutes.delete('/delete-booking/:bookingId',authentication,bookingController.deleteBooking)
bookingRoutes.get('/accepted-tours',authentication,bookingController.viewAcceptedTours)
bookingRoutes.delete('/delete-accepted-tours/:bookingId',authentication,bookingController.deleteAcceptedBooking)







module.exports = bookingRoutes
