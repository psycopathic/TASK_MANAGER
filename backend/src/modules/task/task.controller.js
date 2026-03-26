import TaskService from "./task.service.js";

class TaskController {
  static getTasks(req, res, next) {
    try {
      const tasks = TaskService.listTasks();
      res.status(200).json({ data: tasks });
    } catch (error) {
      next(error);
    }
  }

  static createTask(req, res, next) {
    try {
      const task = TaskService.createTask(req.body);
      res.status(201).json({ data: task });
    } catch (error) {
      next(error);
    }
  }

  static updateTask(req, res, next) {
    try {
      const taskId = Number(req.params.id);
      const task = TaskService.updateTask(taskId, req.body);
      res.status(200).json({ data: task });
    } catch (error) {
      next(error);
    }
  }

  static deleteTask(req, res, next) {
    try {
      const taskId = Number(req.params.id);
      TaskService.deleteTask(taskId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default TaskController;
