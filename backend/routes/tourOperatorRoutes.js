const express = require('express')
const tourOperatorControllers = require('../controllers/tourOPeratorControllers')
const authentication = require('../middleware/authenticator')
const tourOperatorRoutes = express.Router()


tourOperatorRoutes.post('/register',tourOperatorControllers.register)
tourOperatorRoutes.post('/login',tourOperatorControllers.login)
tourOperatorRoutes.put('/accept-custom-tour/:foundTourId',authentication,tourOperatorControllers.acceptCustomTour)
tourOperatorRoutes.get('/get_tour_operator_profile/:id',tourOperatorControllers.getProfileTourOperator)
tourOperatorRoutes.put('/update_mobile_number',authentication,tourOperatorControllers.updateMobileNumber)
tourOperatorRoutes.get('/get-my-tours',authentication,tourOperatorControllers.getTourOperatorTour)

module.exports = tourOperatorRoutes



