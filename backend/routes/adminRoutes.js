const express = require('express')
const adminControllers = require('../controllers/adminControllers')
const authentication = require('../middleware/authenticator')
const adminRoutes= express.Router()


adminRoutes.post('/register',adminControllers.register)
adminRoutes.post('/login',adminControllers.login)
adminRoutes.get('/get_all_role_changing_requests',authentication,adminControllers.getRoleRequest)
adminRoutes.put('/handle_role_change/:requestId',authentication,adminControllers.handleRoleChange)
// adminRoutes.get('/getting/:id',authentication,adminControllers.getOneRequest)


module.exports = adminRoutes
