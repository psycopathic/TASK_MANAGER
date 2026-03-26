import { responseHandler } from "../utils/responseHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import authService from "../services/authService.js";

export const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email || !password) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }

  const result = await authService.register({
    firstName,
    lastName,
    email,
    password,
  });

  res.status(201).json(
    responseHandler(
      true,
      201,
      "User registered successfully",
      result
    )
  );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  const result = await authService.login({ email, password });

  res.status(200).json(
    responseHandler(true, 200, "Login successful", result)
  );
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getUserById(req.user.userId);

  res.status(200).json(
    responseHandler(
      true,
      200,
      "User retrieved successfully",
      {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
      }
    )
  );
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await authService.updateUserProfile(req.user.userId, req.body);

  res.status(200).json(
    responseHandler(
      true,
      200,
      "Profile updated successfully",
      {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
      }
    )
  );
});
