const userControllers = require("../controllers/userConrollers");
const express= require('express');
const authentication = require("../middleware/authenticator");
const userRoutes = express.Router()

userRoutes.post('/register',userControllers.register)
userRoutes.post('/login',userControllers.login)
userRoutes.get('/getoneuser/:userId',authentication,userControllers.getOneUser)
userRoutes.put('/update',authentication,userControllers.updateMobileNumber)
userRoutes.delete('/delete',authentication,userControllers.deleteUser)
userRoutes.patch('/request-tour-operator',authentication,userControllers.requestTourOperator)
userRoutes.get('/view-status',authentication,userControllers.getTourStatus)


module.exports= userRoutes
