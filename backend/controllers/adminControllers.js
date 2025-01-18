const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Admin = require('../model/adminSchema')
const Users = require('../model/userSchema')
const RoleChangeRequest = require('../model/roleChangeRequestingSchema')
const TourOperator = require('../model/tourOperatorsSchema')
const Tour = require("../model/tourSchema")




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
            token
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
    acceptRoleChange: asyncHandler(async (req, res) => {

        // const { action } = req.body
        const { requestId } = req.params
        const adminId = req.admin
        if(!adminId){
            throw new Error("Admin not Found")
           }
        // if (!action) {
        //     throw new Error("Please Give Action ")
        // }
    
        const request = await RoleChangeRequest.findOne({ _id: requestId });

        if (!request || request.status !== 'pending') {
            throw new Error("Requests not found or already processed")
        }
        // if (action !== 'approve') {
        //     throw new Error("Please Give Correct Action ")
        // }
        const foundUserById = request.userId
        await Users.findByIdAndUpdate(foundUserById, { role: 'tour-operator' })
        await RoleChangeRequest.findByIdAndUpdate(foundUserById, { status: 'approved' })

        const foundUser = await Users.findById(foundUserById)
        const tourOperatorPassword = foundUser.password
        const hashedPassword = await bcrypt.hash(tourOperatorPassword, 10)
        await TourOperator.create({
            name: foundUser.name,
            role: foundUser.role,
            password:foundUser.password,
            email: foundUser.email,
            mobile_number: foundUser.mobile_number,
            address: foundUser.address
        

        })
        const name = foundUser.name
        const email = foundUser.email
        const role  = foundUser.role
        const payload = {
            role,
            name,
            email

        }
        const token = jwt.sign(payload, process.env.PRIVATE_KEY)
        res.cookie('tourOperatorData', token, {
            maxAge: 2 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: "none"

        })
      
        request.status = 'approved';
        await Users.findByIdAndDelete(foundUserById);
        await request.save();
        await RoleChangeRequest.findByIdAndDelete(requestId);

        res.json({ message: `Request ${action}d Successfully`, request })

    }),

    cancelRoleChange: asyncHandler(async (req, res) => {

        // const { action } = req.body
        const { requestId } = req.params
        const adminId = req.admin
        if(!adminId){
            throw new Error("Admin not Found")
           }
        // if (!action) {
        //     throw new Error("Please Give Action ")
        // }

        const request = await RoleChangeRequest.findOne({ _id: requestId });

        if (!request || request.status !== 'pending') {
            throw new Error("Requests not found or already processed")
        }
        // if (action !== 'reject') {
        //     throw new Error("Please Give Correct Action ")
        // }
        const foundUserById = request.userId
        await Users.findByIdAndUpdate(foundUserById, { role: 'user' })
        await RoleChangeRequest.findByIdAndUpdate(foundUserById, { status: 'Rejected' })
        request.status = 'rejected';
        await request.save();
        await RoleChangeRequest.findByIdAndDelete(requestId);

        res.json({ message: `Request canceled Successfully`, request })

    }),
    deleteUser:asyncHandler(async(req,res)=>{
       const adminId = req.admin
       const {userId} = req.params
       if(!adminId){
        throw new Error("Admin not Found")
       }
       if(!userId){
        throw new Error("User not Found")
       }
       const deleted = await Users.findByIdAndDelete(userId)
       if(!deleted){
        throw new Error("User Not Deleted")
       }

       res.json({
        message:"User successfully Deleted ",
        deleted
       })
    }),
    deleteTourOperator:asyncHandler(async(req,res)=>{
        const adminId = req.admin
        const {operatorId} = req.params
        if(!adminId){
         throw new Error("Admin not Found")
        }
        if(!operatorId){
         throw new Error("Tour Operator not Found")
        }
        const deleted = await TourOperator.findByIdAndDelete(operatorId)
        if(!deleted){
         throw new Error(" Sorry....Tour OPeartor Not Deleted")
        }
 
        res.json({
         message:"Tour Operator successfully Deleted ",
         deleted
        })
     }),
     deleteTour:asyncHandler(async(req,res)=>{
        const adminId = req.admin
        const {tourId} = req.params
        if(!adminId){
         throw new Error("Admin not Found")
        }
        if(!tourId){
         throw new Error("Tour not Found")
        }
        const deleted = await Tour.findByIdAndDelete(tourId)
        if(!deleted){
         throw new Error(" Sorry....Tour Not Deleted")
        }
 
        res.json({
         message:"Tour successfully Deleted ",
         deleted
        })
     }),
 



}
module.exports = adminControllers