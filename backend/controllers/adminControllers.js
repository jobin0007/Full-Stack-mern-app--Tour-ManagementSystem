const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Admin = require('../model/adminSchema')
const Users = require('../model/userSchema')
const RoleChangeRequest = require('../model/roleChangeRequestingSchema')
const TourOperator = require('../model/tourOperatorsSchema')




const adminControllers = {



    register: asyncHandler(async (req, res) => {
        const { name, email, password, mobile_number } = req.body
        if (!name || !email || !password || !mobile_number) {
            throw new Error("Please Fill All The Fields")
        }
        const admin = await Admin.findOne({ email, mobile_number })
        if (admin) {
            throw new Error("This Person Already Exist ")
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const createAdmin = await Admin.create({
            name,
            email,
            password: hashedPassword,
            mobile_number
        })
        if (!createAdmin) {
            throw new Error("Creation of Admin Failed")
        }
        const role = createAdmin.role
        const payload = {
            role,
            name,
            email
        }
        const token = jwt.sign(payload, process.env.PRIVATE_KEY)
        res.cookie('adminData', token, {
            maxAge: 2 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: "none"
        })
        res.json({
            message: "Registration of Admin  Successfull",
            token

        })





    }),
    login: asyncHandler(async (req, res) => {
        const { email, password } = req.body
        if (!email || !password) {
            throw new Error("Please Fill All The Fields")
        }
        const foundAdmin = await Admin.findOne({ email })
        // const role = foundAdmin.role 
        if (!foundAdmin || !foundAdmin.role == 'admin') {
            throw new Error("Admin not found")
        }

        const adminPassword = await bcrypt.compare(password, foundAdmin.password)
        if (!adminPassword) {
            throw new Error("Password Is Incorrect")
        }
        const token = jwt.sign({ adminId: foundAdmin._id, role: foundAdmin.role }, process.env.PRIVATE_KEY, { expiresIn: '4hr' })
        res.cookie('token', token, {
            maxAge: 2 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: "none"
        })
        res.json({
            message: "Login Successfull",
            foundAdmin
        })
    }
    ),
    getRoleRequest: asyncHandler(async (req, res) => {
        const id = req.admin

        if (!id) {
            throw new Error("Admin Not Found")
        }
        const requests = await RoleChangeRequest.find({ status: "pending" }).populate('userId', 'name email role')
        console.log(requests)
        if (!requests) {
            throw new Error("No Pending Requests")
        }
        res.json({
            requests
        })
    }),
    handleRoleChange: asyncHandler(async (req, res) => {

        const { action } = req.body
        const { requestId } = req.params
        if (!action) {
            throw new Error("Give approval either approved or rejected")
        }

        const request = await RoleChangeRequest.findOne({ userId: requestId });

        if (!request || request.status !== 'pending') {
            throw new Error("Requests not found or already processed")
        }
        if (action === 'approve') {
            await Users.findByIdAndUpdate(requestId, { role: 'tour-operator' })
            const status = request.status

            const foundUser = await Users.findById(requestId)

            const newTourOperator = await TourOperator.create({
                name: foundUser.name,
                role: foundUser.role,
                email: foundUser.email,
                mobile_number: foundUser.mobile_number,
                address: foundUser.address

            })
           
            await Users.findByIdAndDelete(requestId);
           
            await RoleChangeRequest.findByIdAndDelete(requestId);
            request.status = 'approved';

        }
        else if (action === 'reject') {
            request.status = 'rejected';
        }
        else {
            throw new Error("Invalid action")
        }

        await request.save();


        res.json({ message: `Request ${action}d Successfully`, request })

    }),



}
module.exports = adminControllers