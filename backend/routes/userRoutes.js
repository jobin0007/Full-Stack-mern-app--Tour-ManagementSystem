const userControllers = require("../controllers/userConrollers");
const express= require('express')
const userRoutes = express.Router()

userRoutes.post('/register',userControllers.register)
userRoutes.post('/login',userControllers.login)

module.exports= userRoutes
