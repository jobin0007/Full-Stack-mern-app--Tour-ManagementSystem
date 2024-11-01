const asynHandler = require('express-async-handler')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../model/userSchema')
const Admin = require('../model/adminSchema')
const TourOperator = require('../model/tourOperatorsSchema')
const RoleChangeRequest = require('../model/roleChangeRequestingSchema')

require('dotenv').config()



const userControllers = {
    register: asynHandler(async (req, res) => {
        const { name, email, password, address, mobile_number } = req.body
        if (!name || !email || !address || !password || !mobile_number) {
            throw new Error("Data is Incompleted, please fill all the fields ")
        }

        const userFound = await Users.findOne({ email, mobile_number })
        
     
        if (userFound) {
            throw new Error("This person already Exist ")
        }
       
        const hashedPassword =await bcrypt.hash(password, 10)
        const createdUser = await Users.create({
         
            name,
            email,
            password: hashedPassword,
            address,
            mobile_number
        })

        if (!createdUser) {
            throw new Error(" Registeration of User Failed ")
        }
        const role = createdUser.role
        const payload = {
            role,
            name,
            email
        }
        const token = jwt.sign(payload, process.env.PRIVATE_KEY)
        res.cookie('userData', token, {
            maxAge: 2 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: "none"
        })
    
        res.json({
            message:"Registration of User successfull",
            token
        
        })

    }),


    login:asynHandler(async(req,res)=>{
        const {email,password} = req.body
        if(!email || !password){
            throw new Error("Data is Incompleted, please fill all the fields ")
        }
        const user = await Users.findOne({email})
        if(!user ||!user.role =='user'){
            throw new Error("user not found")
        }
    
        const userPassword = await bcrypt.compare(password,user.password)
        if(!userPassword){
            throw new Error("Password Is Incorrect")
        }
        const token = jwt.sign({userId:user.id,role:user.role},process.env.PRIVATE_KEY,{expiresIn:'4hr'})
        // console.log("tokenDetails:",token);
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


    }),
    getOneUser:asynHandler(async(req,res)=>{
        const {id}= req.params
    if(!id){
            throw new Error("Please Give The Id Of The User")
        }
        const userFound = await Users.findById(id)
        if(!userFound){
            throw new Error("User not found")
        }
        res.json({
            message:'User found Successfully ',
            userFound
            

        })
    })
    ,
    updateMobileNumber:asynHandler(async(req,res)=>{
        const {id}= req.user
        const{mobile_number} = req.body
        const {email}= req.body
         if(!id){
            throw new Error("User Not Found")
         }
       
        if(!mobile_number){
            throw new Error("please fill the field")
        }
        const user = await Users.findOne({email})
        if(!user){
            throw new Error("User not found")
        }
        const updateduser = await Users.findByIdAndUpdate(id,{mobile_number},{new:true})
        if(!updateduser){
            throw new Error("Mobile Number not updated")

        }
        res.json({
            message:"Updated Successfully",
            updateduser
        })

    }),
    deleteUser:asynHandler(async(req,res)=>{
        const {id}= req.user
        const {email}= req.body
        if(!id){
            throw new Error("User Not Found")
        }
        const userFound= await Users.findByIdAndDelete(id,{email},{new:true})
        if(!userFound){
            throw new Error("User Not Deleted ")

        }
        res.send("deleted successfully")

    }),
    requestTourOPerator:asynHandler(async(req,res)=>{
  
        const userId = req.user;
    const existingRequest = await RoleChangeRequest.findOne({userId},{status: 'pending' });

    if (existingRequest) {
      return res.status(400).json({ message: 'A pending request already exists.' });
    }

    const newRequest = new RoleChangeRequest({
        userId,
        status: 'pending', // Set the initial status as 'new_request'
    });

    await newRequest.save();
    
    res.json({ message: "Role change request submitted successfully.", request: newRequest });
 

})
}
module.exports = userControllers