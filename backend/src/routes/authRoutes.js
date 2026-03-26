import { Router } from "express";
import {
  register,
  login,
  getMe,
  updateProfile,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);
router.put("/profile", authMiddleware, updateProfile);

export default router;
