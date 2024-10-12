import User from '../../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../../utils/AsyncHandler.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

// Register
export const register = asyncHandler(async (req, res) => {
  const { email, password, name, mobileNum } = req.body;
  if ([name, email, mobileNum, password].some(field => field == null || field.trim() === "")) {
    throw new ApiError(400, "All fields are compulsory or required!!");
  }

  const existingUser = await User.findOne({ $or: [{ email }, { mobileNum }] });
  if (existingUser) {
    throw new ApiError(409, "The User already exists with the current Email or Mobile Number");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashedPassword,
    name,
    mobileNum,
  });

  // Verifying whether the user is created successfully or not and fetching all details except the password field.
  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the User!");
  }

  return res.status(201).json(new ApiResponse(200, createdUser, "User Registered Successfully!"));
});

// Login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Email and Password are required!");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User doesn't exist!");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Credentials");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '6h' });

  // Getting details of the logged-in User
  const loggedInUser = await User.findById(user._id).select("-password");
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 6 * 60 * 60 * 1000, // 6 hours
  };

  return res.status(200)
    .cookie("token", token, options)
    .json(new ApiResponse(200, { user: loggedInUser, token }, "User Logged In Successfully"));
});
