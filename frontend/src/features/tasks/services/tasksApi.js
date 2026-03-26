import httpClient from "../../../services/httpClient";

const tasksApi = {
  createTask: async (payload) => {
    const response = await httpClient.post("/tasks", payload);
    return response.data.data;
  },

  getTasks: async (query = {}) => {
    const params = new URLSearchParams();
    if (query.priority) params.append("priority", query.priority);
    if (query.status) params.append("status", query.status);
    if (query.completed !== undefined) params.append("completed", query.completed);
    if (query.search) params.append("search", query.search);
    if (query.sort) params.append("sort", query.sort);
    if (query.page) params.append("page", query.page);
    if (query.limit) params.append("limit", query.limit);

    const response = await httpClient.get(`/tasks?${params}`);
    return response.data.data;
  },

  getAnalytics: async () => {
    const response = await httpClient.get("/tasks/analytics");
    return response.data.data;
  },

  getTask: async (id) => {
    const response = await httpClient.get(`/tasks/${id}`);
    return response.data.data;
  },

  updateTask: async (id, payload) => {
    const response = await httpClient.put(`/tasks/${id}`, payload);
    return response.data.data;
  },

  deleteTask: async (id) => {
    await httpClient.delete(`/tasks/${id}`);
  },
};

export default tasksApi;
