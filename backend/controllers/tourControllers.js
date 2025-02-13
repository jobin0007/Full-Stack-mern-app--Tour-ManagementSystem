const Tour = require("../model/tourSchema")
const asyncHandler = require('express-async-handler')
const multer = require('multer');
    const cloudinary = require('cloudinary').v2;
    const path = require('path');

const tourControllers={

    createTour:asyncHandler(async(req,res)=>{
        const id = req.tourOperator
        const{ title,description,price,start_date, end_date,  destinations, availableSpots} = req.body
        if(!id){
            throw new Error("Tour Operator Not Found")
        }
        if(!title||!description||!price||!destinations||! availableSpots||!start_date ||!end_date){
            throw new Error("Please Give Required fields")
        }
        const getTour= await Tour.findOne({title})
        if(getTour){
            throw new Error("Already registerd")
        }

        let coverImageUrl = '';
        let galleryImagesUrls = [];
       
        if (req.files.coverImage) {
            const coverImage = req.files.coverImage[0];
            const coverImageUpload = await cloudinary.uploader.upload(coverImage.path);
            coverImageUrl = coverImageUpload.secure_url;
        }
       
        if (req.files.galleryImages) {
            for (let image of req.files.galleryImages) {
                const uploadResult = await cloudinary.uploader.upload(image.path);
                galleryImagesUrls.push(uploadResult.secure_url);
            }
        }
  
        const createTour = await Tour.create({
            tourOperatorId:id,
            title,
            description,
            start_date,
            end_date,
            price,
            destinations,
            availableSpots,
            coverImage: coverImageUrl,
            galleryImages: galleryImagesUrls,
        })

        if(!createTour){
            throw new Error("Creation Of Tour Failed ")  
        }
        res.json({
            message:"Creation Of Tour Successfull",
            createTour,
        })
       
    }),
    searchTour: asyncHandler(async (req, res) => {
       
            const { destinations, title, price } = req.query;
 
            const filter = { status: "active" };
            if (destinations) filter.destinations = { $regex: destinations ,$options: "i" }; 
            if (title) filter.title = { $regex: title,$options: "i"}; 
            if (price) filter.price = Number(price); 
    
            const results = await Tour.find(filter).populate('tourOperatorId','name')
    
            
            if (!results || results.length === 0) {
                throw new Error ("No matching tours found")
            }
       
            res.json({  results });
       
    })
 ,getTours:asyncHandler(async(req,res)=>{

            const getTour = await Tour.find({status:'active'}).populate('tourOperatorId','name')
            if(!getTour){
                throw new Error("Sorry....No Tours Available Now")
            }
            res.json({
                message:" Availble Tours",
                getTour
            })
    
    }),
    getOneTour:asyncHandler(async(req,res)=>{
        const{tourId}= req.params
        if(!tourId){
            throw new Error("Please Provide Id of Tour ")
        }
        const tour = await Tour.findById(tourId).populate('tourOperatorId','name')
        if(!tour){
            throw new Error("Tour Can Not Found")
        }
        res.json({
            message:'Tour Found SuccessFully',
            tour
        })
    })
    
}
module.exports = tourControllers