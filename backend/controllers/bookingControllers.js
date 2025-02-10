const asyncHandler = require("express-async-handler");
const Tour = require("../model/tourSchema");
const Bookings = require("../model/bookingsSchema");
const tourOperatorRoutes = require("../routes/tourOperatorRoutes");
const Users = require("../model/userSchema");
const bookingController = {

createBooking : asyncHandler(async (req, res) => {
    const { foundTourId } = req.params;
    const userId = req.user // Ensure we get the user ID correctly
  
    if (!userId) {
      return res.status(401).json({ error: "Authentication failed" });
    }
  
    // Find the tour
    const foundTour = await Tour.findById(foundTourId);
    if (!foundTour) {
      return res.status(404).json({ error: "No Tours Available Now" });
    }
  
    // Check tour booking status
    if (foundTour.bookingStatus === "booked" || foundTour.status !== "active") {
      return res
        .status(400)
        .json({ error: "Tour Already Booked or Not Active Now" });
    }
  
    // Check if user already has a pending booking
    const existingTourRequest = await Bookings.findOne({ userId });
    if (existingTourRequest) {
      return res.status(400).json({
        error:
          "You Have Already A Pending Tour Request. Please Cancel It Before Booking Again",
      });
    }
  
    // Get user details
    const userDetail = await Users.findById(userId);
    if (!userDetail) {
      return res.status(404).json({ error: "User not found" });
    }
  
    // Create booking
    const createBooking = await Bookings.create({
      tourId: foundTourId,
      tourOperatorId: foundTour.tourOperatorId,
      userId,
      userName: userDetail.name,
      userMobileNumber: userDetail.mobile_number,
      total_price: foundTour.price,
    });
  
    if (!createBooking) {
      return res.status(500).json({ error: "Tour Booking Failed" });
    }
  
    // Update tour status only after booking creation is successful
    await Tour.findByIdAndUpdate(foundTourId, {
      bookingStatus: "booked",
      status: "inactive",
    });
  
    res.json({
      message: "Tour Booked Successfully",
      booking: createBooking,
    });
  }),

  // createBooking: asyncHandler(async (req, res) => {
  //   const { foundTourId } = req.params;
  //   const id = req.user
    
  //   if (!id) {
  //     throw new Error("Authentication failed");
  //   }
   

  //   const foundTour = await Tour.findOne({ _id: foundTourId });

  //   if (!foundTour) {
  //     throw new Error("No Tours Available Now");
  //   }

  //   const foundTourOperatorId = foundTour.tourOperatorId;

  //   const foundPrice = foundTour.price;

  //   if (
  //     foundTour.bookingStatus !== "not-booked" &&
  //     foundTour.status !== "active"
  //   ) {
  //     throw new Error("Tour Already Booked .Otherwise It Is Not Active Now");
  //   }
  //   const existingTourRequest = await Bookings.findOne({ userId: id });

  //   if (existingTourRequest) {
  //     throw new Error(
  //       "You Have Already A Pending Tour Request. Please Try After Cancel It"
  //     );
  //   }

  //   const userDetail = await Users.findById(id);
  //   const createBooking = await Bookings.create({
  //     tourId: foundTourId,
  //     tourOperatorId: foundTourOperatorId,
  //     userId: id,
  //     userName: userDetail.name,
  //     userMobileNumber: userDetail.mobile_number,
  //     total_price: foundPrice,
  //   });

  //   await Tour.findByIdAndUpdate(foundTourId, { bookingStatus: "booked" });
  //   await Tour.findByIdAndUpdate(foundTourId, { status: "inactive" });
  //   if (!createBooking) {
  //     throw new Error(" Tour not Booked");
  //   }

  //   res.json({
  //     message: "Tour Booked ",
  //     createBooking,
  //   });
  // }),
  getAllBooking: asyncHandler(async (req, res) => {
    const tourOperatorId = req.tourOperator; // Extract tourOperatorId from request

    // Validate that the tourOperatorId exists
    if (!tourOperatorId) {
      return res.status(400).json({ error: "Tour Operator ID is missing." });
    }

    // Query the database for bookings matching the tourOperatorId and pending status
    const allBookings = await Bookings.find({
      tourOperatorId,
      booking_status: "pending", // Match pending booking status
    }).populate("userId", "name mobile_number email"); // Populate user details

    // Check if any bookings are found
    if (!allBookings || allBookings.length === 0) {
      return res.status(404).json({ error: "No bookings found." });
    }

    // Respond with the retrieved bookings
    res.status(200).json({
      message: "All bookings retrieved successfully.",
      bookings: allBookings,
    });
  })
  ,getUserBookings: asyncHandler(async (req, res) => {
    try {
      const user = req.user;
      const { userId } = req.params;
  
      if (!user) {
        return res.status(401).json({ error: "Authentication Failed" });
      }
  
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
  
      const foundBookings = await Bookings.find({ userId })
        .populate("tourId", "title")
        .populate("tourOperatorId", "name");
  
      if (!foundBookings || foundBookings.length === 0) {
        return res.status(404).json({ message: "No bookings found for this user", bookings: [] });
      }
  
      const acceptedBookings = foundBookings.filter(
        (booking) => booking.booking_status === "accepted"
      );
  
      if (acceptedBookings.length > 0) {
        return res.json({
          message:
            "Your booking has been accepted by the tour operator. You need to pay some money for confirmation.",
          bookings: acceptedBookings,
        });
      }
  
      const rejectedBookings = foundBookings.filter(
        (booking) => booking.booking_status === "rejected"
      );
  
      if (rejectedBookings.length > 0) {
        return res.json({
          message: " Your bookings have been rejected",
          bookings: rejectedBookings,
        });
      }
  
      // Handle pending bookings (default case)
      return res.json({
        message: "Your bookings are currently pending",
        bookings: foundBookings,
      });
  
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }),
  

  getOneBooking: asyncHandler(async (req, res) => {
    const tourOperatorId = req.tourOperator;
    const { bookingId } = req.params;
    if (!tourOperatorId) {
      throw new Error("Authentication Failed");
    }
    if (!bookingId) {
      throw new Error("Please Give Required Fields");
    }
    const foundBooking = await Bookings.findById(bookingId);
    if (!foundBooking) {
      throw new Error("There is no Booking For this given Id");
    }
    res.json({
      message: "booking found successfully",

      foundBooking,
    });
  }),
  acceptBooking: asyncHandler(async (req, res) => {
    const tourOperatorId = req.tourOperator;
    const { bookingId } = req.params;

    if (!tourOperatorId) {
      throw new Error("Authentication Failed");
    }
    if (!bookingId) {
      throw new Error("BookId required  ");
    }
    const acceptBooking = await Bookings.findByIdAndUpdate(
      bookingId,
      {
        booking_status: "accepted",
      },
      { new: true }
    );
    // await Bookings.findByIdAndDelete(bookingId)
    if (!acceptBooking) {
      throw new Error("accepting Booking failed");
    }
    res.json({
      message: "accepting Booking success",
      acceptBooking,
    });
  }),
  rejectBooking: asyncHandler(async (req, res) => {
    const tourOperatorId = req.tourOperator;
    const { bookingId } = req.params;

    if (!tourOperatorId) {
      throw new Error("Authentication Failed");
    }
    if (!bookingId) {
      throw new Error("BookId required  ");
    }
    const rejectBooking = await Bookings.findByIdAndUpdate(
      bookingId,
      {
        booking_status: "rejected",
      },
      { new: true }
    );
    // await Bookings.findByIdAndDelete(bookingId)
    if (!rejectBooking) {
      throw new Error("rejecting Booking failed");
    }
    res.json({
      message: "Rejecting Booking successfull",
      rejectBooking,
    });
  }),

  deleteBooking: asyncHandler(async (req, res) => {
    const userId = req.user;
    const { bookingId } = req.params;
    if (!userId) {
      throw new Error("Authentication Failed");
    }
    const findBooking = await Bookings.findByIdAndDelete(bookingId, {
      payment_status: "pending",
    });
    if (!findBooking) {
      throw new Error("finding booking failed");
    }
    res.json({
      message: "deleted successfully",
      findBooking,
    });
  }),

viewAcceptedTours :asyncHandler(async(req,res)=>{
  const tourOperatorId = req.tourOperator
  if(!tourOperatorId){
    throw new Error("Authentication Failed");

  }

  const allAcceptedBookings = await Bookings.find({
    tourOperatorId,
    booking_status: "accepted", // Match pending booking status
  }).populate("userId", "name mobile_number email");
if(!allAcceptedBookings){
  throw new Error("No More Accepted Tours");

}
res.json({
  message:'Accepted Tours Found Successfully',
  allAcceptedBookings
})

}

),
deleteAcceptedBooking: asyncHandler(async (req, res) => {
  const tourOperatorId = req.tourOperator;
  const { bookingId } = req.params;
  if (!tourOperatorId) {
    throw new Error("Authentication Failed");
  }
  const findBooking = await Bookings.findByIdAndDelete(bookingId, {
    payment_status: "paid",
  });
  if (!findBooking) {
    throw new Error("finding booking failed");
  }
  res.json({
    message: "deleted successfully",
    findBooking,
  });
}),



};
module.exports = bookingController;
