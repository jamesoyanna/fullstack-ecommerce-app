import { Request, Response } from "../types/express";
import asyncHandler from "express-async-handler";
import { User } from "../models";
import generateToken from "../utils/generateToken";
import { UserDocument } from "../types"; // Import the UserDocument type

/**
 * Authenticate user and get token
 * @route POST /api/users/login
 * @access Public
 */
const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };

  const user = await User.findOne({ email }) as UserDocument;

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id as string), // Explicitly cast to string
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

/**
 * Register a new user
 * @route POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body as {
    name: string;
    email: string;
    password: string;
  };

  const userExists = await User.findOne({ email }) as UserDocument;

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  }) as UserDocument;

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id as string), // Explicitly cast to string
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * Get user profile
 * @route GET /api/users/profile
 * @access Private
 */
export {
  authUser,
  registerUser,
};