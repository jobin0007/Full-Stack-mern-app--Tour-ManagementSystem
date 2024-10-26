const express = require('express')
const userRoutes = require('./userRoutes')
const routes = express()


routes.use('/user',userRoutes)



module.exports = routes