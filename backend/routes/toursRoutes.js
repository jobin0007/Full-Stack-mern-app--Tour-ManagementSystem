    const express = require('express')
    const authentication = require('../middleware/authenticator')
    const tourControllers = require('../controllers/tourControllers')
    const tourRoutes = express.Router()
    const multer = require('multer');
    const cloudinary = require('cloudinary').v2;
    const path = require('path');
    
    
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_SECRET,
    });
    
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/'); // 'uploads' folder in the root directory
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        },
    });
    
    const fileFilter = (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|svg|bmp|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
    
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    };
    
    
    const upload = multer({
        storage,
        fileFilter,
        limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for images
    });


    

    tourRoutes.post('/create_tour',authentication,upload.fields([{ name: 'coverImage', maxCount: 1 },{ name: 'galleryImages', maxCount: 5 }
  ]),tourControllers.createTour)
    tourRoutes.get('/get_all_tour',tourControllers.getTours)
    tourRoutes.get('/search',tourControllers.searchTour)
    tourRoutes.get('/detail/:tourId',tourControllers.getOneTour)




    module.exports = tourRoutes