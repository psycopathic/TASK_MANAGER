import TaskModel from "./task.model.js";

class TaskService {
  static listTasks() {
    return TaskModel.getAll();
  }

  static createTask(data) {
    if (!data.title || !data.title.trim()) {
      const error = new Error("Task title is required");
      error.status = 400;
      throw error;
    }

    return TaskModel.create({ title: data.title.trim() });
  }

  static updateTask(id, data) {
    const updates = {};

    if (typeof data.title === "string") {
      if (!data.title.trim()) {
        const error = new Error("Task title cannot be empty");
        error.status = 400;
        throw error;
      }
      updates.title = data.title.trim();
    }

    if (typeof data.completed === "boolean") {
      updates.completed = data.completed;
    }

    const task = TaskModel.updateById(id, updates);

    if (!task) {
      const error = new Error("Task not found");
      error.status = 404;
      throw error;
    }

    return task;
  }

  static deleteTask(id) {
    const deleted = TaskModel.deleteById(id);

    if (!deleted) {
      const error = new Error("Task not found");
      error.status = 404;
      throw error;
    }
  }
}

export default TaskService;
