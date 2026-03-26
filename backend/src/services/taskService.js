import { Task } from "../models/Task.js";

class TaskService {
  async createTask(payload, userId) {
    const {
      title,
      description,
      priority,
      dueDate,
      status = "todo",
    } = payload;

    const completed = status === "done";

    const task = await Task.create({
      title,
      description,
      status,
      completed,
      priority,
      dueDate,
      userId,
    });

    return task;
  }

  async getTasksByUser(userId, query = {}) {
    const {
      priority,
      status,
      completed,
      search,
      sort = "-createdAt",
      page = 1,
      limit = 10,
    } = query;
    let filter = { userId };

    if (priority) {
      filter.priority = priority;
    }
    if (status) {
      filter.status = status;
    }
    if (completed !== undefined) {
      filter.completed = completed === "true";
    }
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const normalizedPage = Math.max(Number(page) || 1, 1);
    const normalizedLimit = Math.min(Math.max(Number(limit) || 10, 1), 50);
    const skip = (normalizedPage - 1) * normalizedLimit;

    const [tasks, totalCount] = await Promise.all([
      Task.find(filter).sort(sort).skip(skip).limit(normalizedLimit).lean(),
      Task.countDocuments(filter),
    ]);

    return {
      tasks,
      pagination: {
        totalCount,
        page: normalizedPage,
        limit: normalizedLimit,
        totalPages: Math.max(Math.ceil(totalCount / normalizedLimit), 1),
      },
    };
  }

  async getTaskAnalytics(userId) {
    const tasks = await Task.find({ userId }).lean();

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === "done").length;
    const pendingTasks = totalTasks - completedTasks;
    const completionPercentage = totalTasks
      ? Number(((completedTasks / totalTasks) * 100).toFixed(2))
      : 0;

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      completionPercentage,
    };
  }

  async getTaskById(taskId, userId) {
    const task = await Task.findOne({ _id: taskId, userId });
    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      throw error;
    }
    return task;
  }

  async updateTask(taskId, userId, payload) {
    const normalizedPayload = { ...payload };

    if (typeof normalizedPayload.status === "string") {
      normalizedPayload.completed = normalizedPayload.status === "done";
    } else if (typeof normalizedPayload.completed === "boolean") {
      normalizedPayload.status = normalizedPayload.completed ? "done" : "todo";
    }

    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId },
      normalizedPayload,
      { new: true, runValidators: true }
    );

    if (!task) {
      const error = new Error("Task not found or unauthorized");
      error.statusCode = 404;
      throw error;
    }

    return task;
  }

  async deleteTask(taskId, userId) {
    const task = await Task.findOneAndDelete({ _id: taskId, userId });

    if (!task) {
      const error = new Error("Task not found or unauthorized");
      error.statusCode = 404;
      throw error;
    }

    return task;
  }
}

export default new TaskService();
