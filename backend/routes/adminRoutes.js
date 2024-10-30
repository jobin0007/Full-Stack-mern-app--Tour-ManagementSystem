const express = require('express')
const adminControllers = require('../controllers/adminControllers')
const adminRoutes= express.Router()


adminRoutes.post('/register',adminControllers.register)


module.exports = adminRoutes
