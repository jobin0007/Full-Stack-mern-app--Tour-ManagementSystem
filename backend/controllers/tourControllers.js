const Tour = require("../model/tourSchema")
const asyncHandler = require('express-async-handler')

const tourControllers={
    createTour:asyncHandler(async(req,res)=>{
        const id = req.tourOperator
        const{ title,description,duration,price,  destinations, availableSpots} = req.body
        if(!id){
            throw new Error("Tour Operator Not Found")
        }
        if(!title||!description||!duration||!price||!destinations||! availableSpots){
            throw new Error("Please Give Required fields")
        }
        const getTour= await Tour.findOne({title})
        if(getTour){
            throw new Error("Already ready registerd")
        }
        const createTour = await Tour.create({
            tourOperatorId:id,
            title,
            description,
            duration,
            price,
            destinations,
            availableSpots
        })
        // const newTour = new Tour({
        //     tourOperatorId,
        //     status: 'active', // Set the initial status as 'new_request'
        // });
        if(!createTour){
            throw new Error("Creation Of Tour Failed ")  
        }
        res.json({
            message:"Creation Of Tour Successfull",
            createTour,
            // tourOperatorData:newTour
        })
       
    })
   




    ,getTours:asyncHandler(async(req,res)=>{
        const id= req.user
        const adminId = req.admin
        if(id){
            const getTour = await Tour.find({status:'active'}).populate('tourOperatorId','name')
            if(!getTour){
                throw new Error("Sorry....No Tours Available Now")
            }
            res.json({
                message:" Availble Tours",
                getTour
            })
        }
         if(adminId){
            const getTour = await Tour.find({status:'active'}).populate('tourOperatorId','name')
            if(!getTour){
                throw new Error("Sorry....No Tours Available Now")
            }
            res.json({
                message:" Availble Tours",
                getTour
            })
          
        }
         throw new Error("Unauthorized Access ")
    }),
    
}
module.exports = tourControllers