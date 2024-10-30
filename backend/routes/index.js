const express = require('express')
const userRoutes = require('./userRoutes')
const adminRoutes = require('./adminRoutes')
const routes = express()


routes.use('/user',userRoutes)
routes.use('/admin',adminRoutes)



module.exports = routes