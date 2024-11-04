const asyncHandler = require('express-async-handler')
const TourOperator = require('../model/tourOperatorsSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const tourOperatorControllers = {
    register: asyncHandler(async (req, res) => {
        const { name, email, mobile_number, address,password, commission_rate } = req.body
        if (!name || !email || !address || !password || !mobile_number || !commission_rate) {
            throw new Error("Please Give Required Fields ")
        }
        const existingOperator = await TourOperator.findOne({ email })
        if (existingOperator) {
            throw new Error("This Person Already Exist")
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newTourOperator = await TourOperator.create({
            name,
            email,
            password: hashedPassword,
            mobile_number

        })
        if (!newTourOperator) {
            throw new Error("Creation of New Tour Operator Failed ")
        }
        const role = newTourOperator.role
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
        res.json({
            message: "Tour Operator Registered Successfully ",
            token
        })




    }

    ),
    login: asyncHandler(async (req, res) => {

        const { email, password } = req.body
        if (!email || !password) {
            throw new Error("Please Give Required Fields")
        }
        const tourOpertor = await TourOperator.findOne({ email })
        if (!tourOpertor || !tourOpertor.role == 'tour-operator') {
            throw new Error("Sorry...Tour Operator Not Found")

        }
        const passwordCheck = await bcrypt.compare(password, tourOpertor.password)

        if (!passwordCheck) {
            throw new Error("Password Is Incorrect")
        }
        console.log(tourOpertor.role);
        const token = jwt.sign({ tourOperatorId: tourOpertor.id, role: tourOpertor.role }, process.env.PRIVATE_KEY, { expiresIn: '4hr' })
        res.cookie('token', token, {
            maxAge: 2 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: "none"
        })

        res.json({
            message: 'Login Successfull',
            tourOpertor
        })


    }),




    getProfileTourOperator: asyncHandler(async (req, res) => {
        const { id } = req.params
        if (!id) {
            throw new Error("Id Not Given ")
        }
        const findPerson = await TourOperator.findById(id)
        if (!findPerson) {
            throw new Error(" No Person For This Given Id")
        }
        res.json({
            message: "Tour Operator Found Successfully",
            findPerson
        })


    }),
    updateMobileNumber:asyncHandler(async(req,res)=>{
        const {email} = req.body
        const id= req.tourOperator 
        const{mobile_number}= req.body
console.log("id ",id);
        if(!mobile_number){
            throw new Error("please give required details")
        }
        if(!id){
            throw new Error("tour operator not found")
        }
        const found= await TourOperator.findOne({email})
        if(!found){
            throw new Error("Tour operator not found for this given email")
        }
        const updated = await TourOperator.findByIdAndUpdate(id,{mobile_number},{new:true})
        if(!updated){
            throw new Error("Updation Of Mobile Number Failed")
        }
        res.json({
            message:"Mobile Number Updated Successfully",
            updated
        })
    })


}






module.exports = tourOperatorControllers