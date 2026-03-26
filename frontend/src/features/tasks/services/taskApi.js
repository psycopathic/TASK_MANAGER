import httpClient from "../../../services/httpClient";

export async function fetchTasks() {
  const response = await httpClient.get("/tasks");
  return response.data.data;
}

export async function createTask(payload) {
  const response = await httpClient.post("/tasks", payload);
  return response.data.data;
}

export async function toggleTask(taskId, completed) {
  const response = await httpClient.patch(`/tasks/${taskId}`, { completed });
  return response.data.data;
}

export async function deleteTask(taskId) {
  await httpClient.delete(`/tasks/${taskId}`);
}
