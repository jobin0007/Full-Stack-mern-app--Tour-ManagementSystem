const Tour = require("../model/tourSchema")
const asyncHandler = require('express-async-handler')
const multer = require('multer');
    const cloudinary = require('cloudinary').v2;
    const path = require('path');

const tourControllers={
   
    
    // // Create a new tour
    // createTour :asyncHandler( async (req, res) => {
    //     try {
    //         const { title, description, price, start_date, end_date, destinations, availableSpots } = req.body;
    
    //         // Trim title and destinations to avoid whitespace duplicates
    //         const trimmedTitle = title.trim();
    //         const trimmedDestinations = destinations.trim();
    
    //         // Check if a tour with the same title and destinations already exists
    //         const existingTour = await Tour.findOne({ title: trimmedTitle, destinations: trimmedDestinations });
    
    //         if (existingTour) {
    //             return res.status(400).json({ message: "A tour with the same title and destination already exists!" });
    //         }
    
    //         // Handle Image Uploads to Cloudinary
    //         let coverImageUrl = "";
    //         let galleryImageUrls = [];
    
    //         if (req.files["coverImage"]) {
    //             const coverImage = req.files["coverImage"][0];
    //             const uploadedCover = await cloudinary.uploader.upload(coverImage.path);
    //             coverImageUrl = uploadedCover.secure_url;
    //         }
    
    //         if (req.files["galleryImages"]) {
    //             for (const file of req.files["galleryImages"]) {
    //                 const uploadedImage = await cloudinary.uploader.upload(file.path);
    //                 galleryImageUrls.push(uploadedImage.secure_url);
    //             }
    //         }
    
    //         // Create a new Tour instance
    //         const newTour = new Tour({
    //             title: trimmedTitle,
    //             description,
    //             price,
    //             start_date,
    //             end_date,
    //             destinations: trimmedDestinations,
    //             availableSpots,
    //             coverImage: coverImageUrl,
    //             galleryImages: galleryImageUrls,
    //         });
    
    //         // Save the new tour
    //         await newTour.save();
            
    //         return res.status(201).json({ message: "Tour successfully created!", tour: newTour });
    //     } catch (error) {
    //         console.error("Error creating tour:", error);
    //         return res.status(500).json({ message: "Internal Server Error" });
    //     }
    // }),
    
    
    


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
       
     


 // Upload the cover image and gallery images to Cloudinary (or store locally)



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
       
    }),
    searchTour: asyncHandler(async (req, res) => {
       
            const { destinations, title, price } = req.query;
    
           
            // const filter = {};
            const filter = { status: "active" };
            if (destinations) filter.destinations = { $regex: destinations ,$options: "i" }; 
            if (title) filter.title = { $regex: title,$options: "i"}; 
            if (price) filter.price = Number(price); 
    
            console.log("Filter:", filter); 
    
         
            const results = await Tour.find(filter).populate('tourOperatorId','name')
    
            
            if (!results || results.length === 0) {
                throw new Error ("No matching tours found")
            }
    
          
            res.json({  results });
       
    })
    
   




    ,getTours:asyncHandler(async(req,res)=>{
        // const id= req.user
        // const adminId = req.admin
        // if(id){
            const getTour = await Tour.find({status:'active'}).populate('tourOperatorId','name')
            if(!getTour){
                throw new Error("Sorry....No Tours Available Now")
            }
            res.json({
                message:" Availble Tours",
                getTour
            })
        // }
        //  if(adminId){
        //     const getTour = await Tour.find({status:'active'}).populate('tourOperatorId','name')
        //     if(!getTour){
        //         throw new Error("Sorry....No Tours Available Now")
        //     }
        //     res.json({
        //         message:" Availble Tours",
        //         getTour
        //     })
          
        // }
        //  throw new Error("Unauthorized Access ")
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