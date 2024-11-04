const express = require('express')
const userRoutes = require('./userRoutes')
const adminRoutes = require('./adminRoutes')
const tourOperatorRoutes = require('./tourOperatorRoutes')
const routes = express()


routes.use('/user',userRoutes)
routes.use('/admin',adminRoutes)
routes.use('/tour_operator',tourOperatorRoutes)




module.exports = routes