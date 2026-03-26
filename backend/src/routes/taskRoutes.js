import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskAnalytics,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

// All task routes require authentication
router.use(authMiddleware);

router.post("/", createTask);
router.get("/", getTasks);
router.get("/analytics", getTaskAnalytics);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
