const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Admin = require('../model/adminSchema')



const adminControllers ={



register:asyncHandler(async(req,res)=>{
    const{name,email,password,mobile_number}= req.body
    if(!name ||!email||!password||!mobile_number){
        throw new Error("Please Fill All The Fields")
    }
    const admin = await Admin.findOne({email,mobile_number})
    if(admin){
        throw new Error("This Person Already Exist ")
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const createAdmin = await Admin.create({
        name,
        email,
        password:hashedPassword,
        mobile_number
    })
    if(!createAdmin){
        throw new Error("Creation of Admin Failed")
    }
    const payload={
        role,
        name,
        email
    }
    const token = jwt.sign(payload,process.env.PRIVATE_KEY)
    res.cookie('adminData',token,{
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: "none"
    })
    res.json({
        message:"Registration of Admin  Successfull",
        token

    })




})


}
module.exports = adminControllers