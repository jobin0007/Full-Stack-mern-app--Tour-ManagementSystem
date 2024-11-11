const express = require('express')
const adminControllers = require('../controllers/adminControllers')
const authentication = require('../middleware/authenticator')
const adminRoutes= express.Router()


adminRoutes.post('/register',adminControllers.register)
adminRoutes.post('/login',adminControllers.login)
adminRoutes.get('/get_all_role_changing_requests',authentication,adminControllers.getRoleRequest)
adminRoutes.put('/accept_role_change/:requestId',authentication,adminControllers.acceptRoleChange)
adminRoutes.put('/cancel_role_change/:requestId',authentication,adminControllers.cancelRoleChange)



module.exports = adminRoutes
