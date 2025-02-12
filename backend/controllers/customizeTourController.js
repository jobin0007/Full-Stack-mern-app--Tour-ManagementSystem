
const asyncHandler = require('express-async-handler')
const CustomizedTours = require('../model/customizedToursSchema')
const Users = require('../model/userSchema')
const Bookings = require('../model/bookingsSchema')



const customizedTourControllers = {
    createCustomizedTour: asyncHandler(async (req, res) => {
        const id = req.user
        // if(!title||!description||!duration||!price||!destinations||! availableSpots)
        const { title,location, description, start_date, end_date, budget, participants } = req.body

        if (!id) {
            throw new Error('User not Found')
        }
        if (!title || !description ||!location|| !budget || !participants || !start_date || !end_date) {
            throw new Error('Give All Fields')
        }

        const existingTour = await CustomizedTours.findOne({ userId: id }, { status: 'pending' })

        if (existingTour) {
            throw new Error('Already Pending Request')
        }

        const createCustomize = await CustomizedTours.create({
            userId: id,
            title,
            location,
            description,
            start_date,
            end_date,
            budget,
            participants,

        })

        if (!createCustomize) {
            throw new Error('Creation Of Customized Tours Failed')
        }
        res.json({
            message: "Successfully Created Customized Tour",
            createCustomize
        })

    }),
    getAllCustomizedTours: asyncHandler(async (req, res) => {
        const tourOperatorId = req.tourOperator
        if (!tourOperatorId) {
            throw new Error("Sorry...Tour Operator Not Found.Please Sign In..")
        }
        const foundTours = await CustomizedTours.find({ status: 'pending' }).populate('userId', 'name mobile_number email')
        if (!foundTours) {
            throw new Error('No Customized Tour Requests ')
        }
        res.json({
            message: "Customized Tour Requests:",
            foundTours
        })


    }),
    getOneCustomizedTour: asyncHandler(async (req, res) => {
        const { customTourId } = req.params
        const id = req.tourOperator
        if (!id) {
            throw new Error("Tour OperatorNot Found")
        }
        const findUserCustomTour = await CustomizedTours.findById(customTourId)
        const findStatus = await CustomizedTours.findOne({ customTourId }, { status: 'pending' })
        if (findStatus) {
            throw new Error("already Handled your Request")
        }
        const findRequestedUserId = findUserCustomTour.userId
        const findUser = await Users.findById(findRequestedUserId)
        const findUsername = findUser.name
        const findUsermobile_number = findUser.mobile_number
        const findUseremail = findUser.email

        const findRequestedUser = {
            findUsername,
            findUsermobile_number,
            findUseremail
        }
        if (!findUserCustomTour) {
            throw new Error("There is no Custom Tour for the given id")
        }
        res.json({
            message: "Details of Custom Tour by the given id",
            findUserCustomTour,
            findRequestedUser
        })
    }

    ),
    getStatusCustomizedTour: asyncHandler(async (req, res) => {
    try {
      const user = req.user;
      const { userId } = req.params;
  
      if (!user) {
        return res.status(401).json({ error: "Authentication Failed" });
      }
  
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
  
      const foundBookings = await CustomizedTours.find({ userId })
        .populate("tourId", "title")
        .populate("tourOperatorId", "name");
  
      if (!foundBookings || foundBookings.length === 0) {
        return res.status(404).json({ message: "No bookings found for this user", bookings: [] });
      }
   
      const acceptedBookings = foundBookings.filter(
        (booking) => booking.status === "accepted"
      );
  
      if (acceptedBookings) {
        return res.json({
          message:
            "Your Customized Tour accepted.Operator Will contact you Within 1 Week",
          bookings: acceptedBookings,
        });
      }
  
      const rejectedBookings = foundBookings.filter(
        (booking) => booking.booking_status === "declined"
      );
  
      if (rejectedBookings) {
        return res.json({
          message: " Your Custom Tour has been Declined",
          bookings: rejectedBookings,
        });
      }
  
      return res.json({
        message: "Your bookings are currently pending",
        bookings: foundBookings,
      });
  
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }),

   }
module.exports = customizedTourControllers
