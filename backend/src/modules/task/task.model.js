let tasks = [];
let nextId = 1;

class TaskModel {
  static getAll() {
    return tasks;
  }

  static create(payload) {
    const task = {
      id: nextId++,
      title: payload.title,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    tasks.push(task);
    return task;
  }

  static updateById(id, updates) {
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return null;
    }

    tasks[index] = {
      ...tasks[index],
      ...updates,
    };

    return tasks[index];
  }

  static deleteById(id) {
    const initialLength = tasks.length;
    tasks = tasks.filter((task) => task.id !== id);
    return tasks.length < initialLength;
  }
}

export default TaskModel;
