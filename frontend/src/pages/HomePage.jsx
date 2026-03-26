import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnalyticsCards from "../features/tasks/components/AnalyticsCards";
import PaginationControls from "../features/tasks/components/PaginationControls";
import TaskDetailsCard from "../features/tasks/components/TaskDetailsCard";
import TaskFilters from "../features/tasks/components/TaskFilters";
import TaskForm from "../features/tasks/components/TaskForm";
import TaskList from "../features/tasks/components/TaskList";
import {
  createTask,
  deleteTask,
  fetchTaskAnalytics,
  fetchTasks,
  selectTaskAnalytics,
  selectTaskAnalyticsLoading,
  selectTasksFilters,
  selectTasksPagination,
  selectTasks,
  selectTasksError,
  selectTasksLoading,
  setFilters,
  updateTask,
} from "../features/tasks/store/tasksSlice";

function HomePage() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const loading = useSelector(selectTasksLoading);
  const error = useSelector(selectTasksError);
  const filters = useSelector(selectTasksFilters);
  const pagination = useSelector(selectTasksPagination);
  const analytics = useSelector(selectTaskAnalytics);
  const analyticsLoading = useSelector(selectTaskAnalyticsLoading);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);

  useEffect(() => {
    dispatch(fetchTasks(filters));
    dispatch(fetchTaskAnalytics());
  }, [dispatch, filters]);

  useEffect(() => {
    if (!selectedTask) {
      return;
    }

    const selectedTaskId = selectedTask._id || selectedTask.id;
    const refreshedTask = tasks.find((task) => {
      const taskId = task._id || task.id;
      return taskId === selectedTaskId;
    });

    if (refreshedTask) {
      setSelectedTask(refreshedTask);
    }
  }, [tasks, selectedTask]);

  useEffect(() => {
    if (!selectedTask && tasks.length) {
      setSelectedTask(tasks[0]);
    }
  }, [tasks, selectedTask]);

  async function handleCreateTask(payload) {
    const action = await dispatch(createTask(payload));
    if (createTask.fulfilled.match(action)) {
      dispatch(fetchTaskAnalytics());
    }
  }

  async function handleToggleTask(taskId, completed) {
    await dispatch(updateTask({ id: taskId, data: { completed } }));
  }

  async function handleDeleteTask(taskId) {
    const action = await dispatch(deleteTask(taskId));
    setSelectedTask((current) => {
      if (!current) {
        return null;
      }

      const currentId = current._id || current.id;
      return currentId === taskId ? null : current;
    });

    if (deleteTask.fulfilled.match(action)) {
      dispatch(fetchTaskAnalytics());
    }
  }

  async function handleUpdateTask(taskId, data) {
    const action = await dispatch(updateTask({ id: taskId, data }));

    if (updateTask.fulfilled.match(action)) {
      setSelectedTask(action.payload);
      dispatch(fetchTaskAnalytics());
    }
  }

  function handleFiltersChange(nextFilters) {
    dispatch(setFilters({ ...nextFilters, page: 1 }));
  }

  function handlePageChange(nextPage) {
    dispatch(setFilters({ page: nextPage }));
  }

  function handleSelectTask(task) {
    setSelectedTask(task);
    setIsDetailsOpen(true);
  }

  function handleCloseTaskCard() {
    setSelectedTask(null);
  }

  const todoTasks = tasks.filter((task) => (task.status || "todo") === "todo");
  const inProgressTasks = tasks.filter((task) => (task.status || "todo") === "in-progress");
  const doneTasks = tasks.filter((task) => (task.status || "todo") === "done");

  return (
    <section className={`task-dashboard ${isDetailsOpen ? "" : "details-collapsed"}`}>
      <aside className="workspace-details">
        <TaskDetailsCard
          task={selectedTask}
          onClose={handleCloseTaskCard}
          onUpdateTask={handleUpdateTask}
        />
      </aside>

      <section className="workspace-main">
        <header className="workspace-header">
          <div>
            <p className="workspace-kicker">Workspace</p>
            <h1>Day Planning</h1>
          </div>
          <div className="workspace-header-actions">
            <button
              type="button"
              className="details-toggle"
              onClick={() => setIsDetailsOpen((open) => !open)}
              aria-label={isDetailsOpen ? "Collapse right panel" : "Expand right panel"}
              aria-pressed={isDetailsOpen}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M4 6h16v2H4zM4 11h10v2H4zM4 16h16v2H4z" />
              </svg>
            </button>
          </div>
        </header>

        {error ? <p className="inline-error">{error}</p> : null}

        <AnalyticsCards analytics={analytics} loading={analyticsLoading} />
        <TaskForm onCreateTask={handleCreateTask} loading={loading} />
        <TaskFilters filters={filters} onFiltersChange={handleFiltersChange} />

        <div className="kanban-section-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          <h2>Kanban Board</h2>
        </div>

        <div className="status-groups">
          <section className="status-column">
            <div className="column-header">
              <span className="column-dot todo" />
              <h3>Todo</h3>
              <span className="column-count">{todoTasks.length}</span>
            </div>
            <div className="column-body">
              <TaskList
                tasks={todoTasks}
                loading={loading}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
                onSelectTask={handleSelectTask}
              />
            </div>
          </section>

          <section className="status-column">
            <div className="column-header">
              <span className="column-dot in-progress" />
              <h3>In Progress</h3>
              <span className="column-count">{inProgressTasks.length}</span>
            </div>
            <div className="column-body">
              <TaskList
                tasks={inProgressTasks}
                loading={loading}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
                onSelectTask={handleSelectTask}
              />
            </div>
          </section>

          <section className="status-column">
            <div className="column-header">
              <span className="column-dot done" />
              <h3>Done</h3>
              <span className="column-count">{doneTasks.length}</span>
            </div>
            <div className="column-body">
              <TaskList
                tasks={doneTasks}
                loading={loading}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
                onSelectTask={handleSelectTask}
              />
            </div>
          </section>
        </div>

        <PaginationControls
          pagination={pagination}
          loading={loading}
          onPageChange={handlePageChange}
        />
      </section>
    </section>
  );
}

export default HomePage;
