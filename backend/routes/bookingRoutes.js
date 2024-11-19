const express = require('express')
const bookingController = require('../controllers/bookingControllers')
const authentication = require('../middleware/authenticator')
const bookingRoutes = express.Router()



bookingRoutes.put('/create_booking/:foundTourId',authentication,bookingController.createBooking)
bookingRoutes.get('/get_all_bookings',authentication,bookingController.getAllBooking)
bookingRoutes.get('/get-one-booking',authentication,bookingController.getOneBooking)





module.exports = bookingRoutes
