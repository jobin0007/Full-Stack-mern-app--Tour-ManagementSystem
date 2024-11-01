const userControllers = require("../controllers/userConrollers");
const express= require('express');
const authentication = require("../middleware/authenticator");
const userRoutes = express.Router()

userRoutes.post('/register',userControllers.register)
userRoutes.post('/login',userControllers.login)
userRoutes.get('/getoneuser/:id',authentication,userControllers.getOneUser)
userRoutes.put('/update',authentication,userControllers.updateMobileNumber)
userRoutes.delete('/delete',authentication,userControllers.deleteUser)
userRoutes.patch('/request-tour-operator',authentication,userControllers.requestTourOPerator)

module.exports= userRoutes
