const express = require('express')
const customizedTourControllers = require('../controllers/customizeTourController')
const authentication = require('../middleware/authenticator')
const customizedTourRoutes = express.Router()

customizedTourRoutes.post('/create-customize-tour',authentication,customizedTourControllers.createCustomizedTour)
customizedTourRoutes.get('/all-customized-tour-requests',authentication,customizedTourControllers.getAllCustomizedTours)
customizedTourRoutes.get('/:customTourId',authentication,customizedTourControllers.getOneCustomizedTour)
customizedTourRoutes.get('/status/:userId',authentication,customizedTourControllers.getStatusCustomizedTour)

module.exports = customizedTourRoutes