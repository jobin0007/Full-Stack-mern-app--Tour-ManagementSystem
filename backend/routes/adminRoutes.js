const express = require('express')
const adminControllers = require('../controllers/adminControllers')
const authentication = require('../middleware/authenticator')
const adminRoutes= express.Router()


adminRoutes.post('/register',adminControllers.register)
adminRoutes.post('/login',adminControllers.login)
adminRoutes.get('/getoneadmin/:adminId',authentication,adminControllers.getOneAdmin)
adminRoutes.get('/get-users',authentication,adminControllers.getAllUsers)
adminRoutes.get('/get-tour-operators',authentication,adminControllers.getAllTourOperators)
adminRoutes.get('/get_all_role_changing_requests',authentication,adminControllers.getRoleRequest)
adminRoutes.put('/accept_role_change/:requestId',authentication,adminControllers.acceptRoleChange)
adminRoutes.put('/cancel_role_change/:requestId',authentication,adminControllers.cancelRoleChange)
adminRoutes.delete('/delete-user/:userId',authentication,adminControllers.deleteUser)
adminRoutes.delete('/delete-tour/:tourId',authentication,adminControllers.deleteTour)
adminRoutes.delete('/delete-tour-operator/:operatorId',authentication,adminControllers.deleteTourOperator)



module.exports = adminRoutes
