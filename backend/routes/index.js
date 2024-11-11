const express = require('express')
const userRoutes = require('./userRoutes')
const adminRoutes = require('./adminRoutes')
const tourOperatorRoutes = require('./tourOperatorRoutes')
const bookingRoutes = require('./bookingRoutes')
const tourRoutes = require('./toursRoutes')
const customizedTourRoutes = require('./customizedTours')
const routes = express()


routes.use('/user',userRoutes)
routes.use('/admin',adminRoutes)
routes.use('/tour_operator',tourOperatorRoutes)
routes.use('/tour',tourRoutes)
routes.use('/cusomized-tour',customizedTourRoutes)
routes.use('/bookings',bookingRoutes)




module.exports = routes