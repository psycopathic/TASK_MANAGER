import { responseHandler } from "../utils/responseHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import taskService from "../services/taskService.js";

export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  if (!title) {
    const error = new Error("Task title is required");
    error.statusCode = 400;
    throw error;
  }

  const task = await taskService.createTask(
    { title, description, status, priority, dueDate },
    req.user.userId
  );

  res.status(201).json(
    responseHandler(true, 201, "Task created successfully", task)
  );
});

export const getTasks = asyncHandler(async (req, res) => {
  const { priority, status, completed, search, sort, page, limit } = req.query;

  const result = await taskService.getTasksByUser(req.user.userId, {
    priority,
    status,
    completed,
    search,
    sort,
    page,
    limit,
  });

  res.status(200).json(
    responseHandler(
      true,
      200,
      "Tasks retrieved successfully",
      {
        tasks: result.tasks,
        count: result.tasks.length,
        pagination: result.pagination,
      }
    )
  );
});

export const getTaskAnalytics = asyncHandler(async (req, res) => {
  const analytics = await taskService.getTaskAnalytics(req.user.userId);

  res.status(200).json(
    responseHandler(true, 200, "Task analytics retrieved successfully", analytics)
  );
});

export const getTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await taskService.getTaskById(id, req.user.userId);

  res.status(200).json(
    responseHandler(true, 200, "Task retrieved successfully", task)
  );
});

export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await taskService.updateTask(id, req.user.userId, req.body);

  res.status(200).json(
    responseHandler(true, 200, "Task updated successfully", task)
  );
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await taskService.deleteTask(id, req.user.userId);

  res.status(200).json(
    responseHandler(true, 200, "Task deleted successfully")
  );
});
