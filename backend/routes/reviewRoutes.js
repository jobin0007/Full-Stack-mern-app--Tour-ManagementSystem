const express = require('express')
const reviewController = require('../controllers/reviewController')
const authentication = require('../middleware/authenticator')
const reviewRoutes = express.Router()

reviewRoutes.post('/create-review',authentication,reviewController.createReview)



module.exports= reviewRoutes