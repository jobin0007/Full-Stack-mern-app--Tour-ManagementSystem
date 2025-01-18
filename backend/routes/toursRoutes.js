const express = require('express')
const authentication = require('../middleware/authenticator')
const tourControllers = require('../controllers/tourControllers')
const tourRoutes = express.Router()



tourRoutes.post('/create_tour',authentication,tourControllers.createTour)
tourRoutes.get('/get_all_tour',tourControllers.getTours)



module.exports = tourRoutes