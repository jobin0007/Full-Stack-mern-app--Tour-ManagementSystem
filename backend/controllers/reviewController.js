const asyncHandler = require('express-async-handler')
const Review = require('../model/reviewSchema')



const reviewController = {
    createReview: asyncHandler(async (req, res) => {
        const userId = req.user
        const { rating, comment } = req.body
        if (!userId) {
            throw new Error("Sorry....User Not Found")
        }
        if (!rating || !comment) {
            throw new Error("Give All Required Inputs")
        }
        const createReview = await Review.create({
            rating,
            comment

        })
        if (!createReview) {
            throw new Error("Creation Of Reviews failed")
        }

        res.json({
            message: 'Creation Of Review Successfully Completed',
            createReview
        })


    })
}
module.exports = reviewController