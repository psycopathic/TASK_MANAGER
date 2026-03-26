import httpClient from "../../../services/httpClient";

const authApi = {
  register: async (payload) => {
    const response = await httpClient.post("/auth/register", payload);
    return response.data.data;
  },

  login: async (payload) => {
    const response = await httpClient.post("/auth/login", payload);
    return response.data.data;
  },

  getCurrentUser: async () => {
    const response = await httpClient.get("/auth/me");
    return response.data.data;
  },

  updateProfile: async (payload) => {
    const response = await httpClient.put("/auth/profile", payload);
    return response.data.data;
  },
};

export default authApi;
