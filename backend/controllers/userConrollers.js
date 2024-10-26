const asynHandler = require('express-async-handler')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/userSchema')
require('dotenv').config()



const userControllers = {
    register: asynHandler(async (req, res) => {
        const { name, email, password, address, mobile_number } = req.body
        if (!name || !email || !address || !password || !mobile_number) {
            throw new Error("Data is Incompleted, please fill all the fields ")
        }

        const userFound = await User.findOne({ email, mobile_number })
        if (userFound) {
            throw new Error("This User already Exist ")
        }
        const hashedPassword =await bcrypt.hash(password, 10)
        const createdUser = await User.create({
            name,
            email,
            password: hashedPassword,
            address,
            mobile_number
        })

        if (!createdUser) {
            throw new Error(" Registeration of User Failed ")
        }
        const payload = {
            name,
            email
        }
        const token = jwt.sign(payload, process.env.PRIVATE_KEY)
        res.cookie('Data', token, {
            maxAge: 2 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: "none"
        })
        res.json({
            token
        })

    }),


    login:asynHandler(async(req,res)=>{
        const {email,password} = req.body
        if(!email || !password){
            throw new Error("Data is Incompleted, please fill all the fields ")
        }
        const user = await User.findOne({email})
        if(!user){
            throw new Error("user not found")
        }
        const userPassword = await bcrypt.compare(password,user.password)
        if(!userPassword){
            throw new Error("Password Is Incorrect")
        }
        const token = jwt.sign({userId:user.id},process.env.PRIVATE_KEY,{expiresIn:'4hr'})
        res.cookie('token',token,{
            maxAge: 2 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: "none"
        })
        res.json({
            message:"Login Successfull",
            user
        })


    })
}
module.exports = userControllers