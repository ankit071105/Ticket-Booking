import User from '../../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../../utils/AsyncHandler.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
// Register
export const register = asyncHandler(async (req, res) => {
  const { email, password, name, mobileNum } = req.body;
  if (
    [name, email, mobileNum, password].some(
      (field) => field == null || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are compulsory or required!!");
  }
  
  const existingUser = await User.findOne({
    $or: [{ email },{ mobileNum }],
  });
  if (existingUser) {
    throw new ApiError(
      409,
      "The User already exists with the current Email or UserName"
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashedPassword,
    name,
    mobileNum,
  });
  // Verifying weather the user is created succesfully or not and  fetchig all details except the password feild.
  const createdUser = await User.findById(user._id).select(
    "-password "
  );
  if (!createdUser) {
    throw new ApiError(
      500,
      "Something went Wrong while registering the User !"
    );
  }
  return resp
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Succesfully !"));
});

// Login
export const login = asyncHandler(async (req, res) => {
  const { email, password , mobileNum } = req.body;
  if (!mobileNum && !email) {
    throw new ApiError(400, "MobileNum or Email is Required !");
  }
  
  const user = await User.findOne({ 
    $or:[{ email },{ mobileNum}]
  });
  if (!user) {
    throw new ApiError(404, "User Does'nt Exist !");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    //return res.status(400).json({ message: 'Invalid credentials' });
    throw new ApiError(401,"Invalid Credentials");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '6h' });

  // Getting details of the logged-in User
  const loggedInUser=await User.findById(user._id).select(
    "-password"
  );
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 6 * 60 * 60 * 1000, // 6 hours
  };

  return resp
    .status(200)
    .cookie("token", token, options)
    .json(
      new ApiResponse(
        200,
        {
          user:loggedInUser,token
        },
        "User Logged In Successfully"
      )
    )
});
