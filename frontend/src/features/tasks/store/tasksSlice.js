import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tasksApi from "../services/tasksApi";

const initialState = {
  tasks: [],
  loading: false,
  analyticsLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 1,
    totalCount: 0,
  },
  analytics: {
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    completionPercentage: 0,
  },
  filters: {
    priority: null,
    status: null,
    search: "",
    sort: "-createdAt",
    page: 1,
    limit: 10,
  },
};

export const createTask = createAsyncThunk(
  "tasks/create",
  async (payload, { rejectWithValue }) => {
    try {
      const task = await tasksApi.createTask(payload);
      return task;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (query = {}, { rejectWithValue }) => {
    try {
      return await tasksApi.getTasks(query);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchTaskAnalytics = createAsyncThunk(
  "tasks/fetchAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      return await tasksApi.getAnalytics();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const task = await tasksApi.updateTask(id, data);
      return task;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id, { rejectWithValue }) => {
    try {
      await tasksApi.deleteTask(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTaskAnalytics.pending, (state) => {
        state.analyticsLoading = true;
      })
      .addCase(fetchTaskAnalytics.fulfilled, (state, action) => {
        state.analyticsLoading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchTaskAnalytics.rejected, (state, action) => {
        state.analyticsLoading = false;
        state.error = action.payload;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export const { setFilters, clearError } = tasksSlice.actions;

export const selectTasks = (state) => state.tasks.tasks;
export const selectTasksLoading = (state) => state.tasks.loading;
export const selectTasksError = (state) => state.tasks.error;
export const selectTasksFilters = (state) => state.tasks.filters;
export const selectTasksPagination = (state) => state.tasks.pagination;
export const selectTaskAnalytics = (state) => state.tasks.analytics;
export const selectTaskAnalyticsLoading = (state) => state.tasks.analyticsLoading;

export default tasksSlice.reducer;
