import bcryptjs from "bcryptjs";
import { User } from "../models/User.js";
import { generateToken } from "../utils/tokenUtils.js";

class AuthService {
  async register(payload) {
    const { firstName, lastName, email, password } = payload;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("Email already registered");
      error.statusCode = 409;
      throw error;
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(user._id);

    return {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    };
  }

  async login(payload) {
    const { email, password } = payload;

    // Find user and include password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    // Compare password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    // Generate token
    const token = generateToken(user._id);

    return {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    };
  }

  async getUserById(userId) {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    return user;
  }

  async updateUserProfile(userId, payload) {
    const { firstName, lastName, avatar } = payload;

    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, avatar },
      { new: true, runValidators: true }
    );

    return user;
  }
}

export default new AuthService();
