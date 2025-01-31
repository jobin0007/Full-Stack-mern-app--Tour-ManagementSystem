const asynHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../model/userSchema");
const Bookings = require("../model/bookingsSchema");
const TourOperator = require("../model/tourOperatorsSchema");
const Admin = require("../model/adminSchema");
const RoleChangeRequest = require("../model/roleChangeRequestingSchema");

require("dotenv").config();

const userControllers = {
  register: asynHandler(async (req, res) => {
    const { name, email, password, address, mobile_number } = req.body;
    if (!name || !email || !address || !password || !mobile_number) {
      throw new Error("Data is Incompleted, please fill all the fields ");
    }

    const userFound = await Users.findOne({ email, mobile_number });

    if (userFound) {
      throw new Error("This person already Exist ");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await Users.create({
      name,
      email,
      password: hashedPassword,
      address,
      mobile_number,
    });

    if (!createdUser) {
      throw new Error(" Registeration of User Failed ");
    }
    const role = createdUser.role;
    const payload = {
      role,
      name,
      email,
    };
    const token = jwt.sign(payload, process.env.PRIVATE_KEY);
    res.cookie("userData", token, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });

    res.json({
      message: "Registration of User successfull",
      token,
    });
  }),
  login: asynHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please Give Required Fields");
    }
    const user = await Users.findOne({ email });
    if (!user || !user.role == "user") {
      throw new Error("Sorry...User Not Found");
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      throw new Error("Password Is Incorrect");
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.PRIVATE_KEY,
      { expiresIn: "4hr" }
    );
    res.cookie("token", token, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });

    res.json({
      message: "Login Successfull",
      token,
    });
  }),
  getOneUser: asynHandler(async (req, res) => {
    const id = req.user;
    if (!id) {
      throw new Error("Authentication failed");
    }
    const { userId } = req.params;

    if (!userId) {
      throw new Error("Please provide the ID of the user");
    }

    const userFound = await Users.findById(userId);
    if (!userFound) {
      throw new Error("User not found");
    }
    res.json({
      message: "User found Successfully ",
      userFound,
    });
  }),
  updateMobileNumber: asynHandler(async (req, res) => {
    const { id } = req.user;
    const { mobile_number } = req.body;
    const { email } = req.body;
    if (!id) {
      throw new Error("User Not Found");
    }

    if (!mobile_number) {
      throw new Error("please fill the field");
    }
    const user = await Users.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const updateduser = await Users.findByIdAndUpdate(
      id,
      { mobile_number },
      { new: true }
    );
    if (!updateduser) {
      throw new Error("Mobile Number not updated");
    }
    res.json({
      message: "Updated Successfully",
      updateduser,
    });
  }),

  deleteUser: asynHandler(async (req, res) => {
    const { id } = req.user;
    const { email } = req.body;
    if (!id) {
      throw new Error("User Not Found");
    }
    const userFound = await Users.findByIdAndDelete(
      id,
      { email },
      { new: true }
    );
    if (!userFound) {
      throw new Error("User Not Deleted ");
    }
    res.send("deleted successfully");
  }),

  requestTourOperator: asynHandler(async (req, res) => {
    const userId = req.user;
    const existingRequest = await RoleChangeRequest.findOne(
      { userId },
      { status: "pending" }
    );

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "A pending request already exists." });
    }

    const newRequest = new RoleChangeRequest({
      userId,
      status: "pending", // Set the initial status as 'new_request'
    });

    await newRequest.save();

    res.json({
      message: "Role change request submitted successfully.",
      request: newRequest,
    });
  }),
  getTourStatus: asynHandler(async (req, res) => {
    const userId = req.user;
    if (!userId) {
      throw new Errror("Authentication Failed");
    }

    const bookings = await Bookings.find({ userId }).select("booking_status");

    if (!bookings || bookings.length === 0) {
      throw new Error("No Bookings Found");
    }

    const status = bookings.map((booking) => booking.booking_status);
    res.json({
      message: "Booking Status:",
      status,
    });
  }),
};
module.exports = userControllers;
