const express = require('express')
const userRoutes = require('./userRoutes')
const adminRoutes = require('./adminRoutes')
const tourOperatorRoutes = require('./tourOperatorRoutes')
const bookingRoutes = require('./bookingRoutes')
const tourRoutes = require('./toursRoutes')
const customizedTourRoutes = require('./customizedTours')
const paymentRoutes = require('./paymentRoutes')
const reviewRoutes = require('./reviewRoutes')


const routes = express()


routes.use('/user',userRoutes)
routes.use('/admin',adminRoutes)
routes.use('/tour-operator',tourOperatorRoutes)
routes.use('/tour',tourRoutes)
routes.use('/cusomized-tour',customizedTourRoutes)
routes.use('/bookings',bookingRoutes)
routes.use('/review',reviewRoutes)
routes.use('/payment',paymentRoutes)






module.exports = routes