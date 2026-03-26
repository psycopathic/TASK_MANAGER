function TaskList({ tasks, loading, onToggleTask, onDeleteTask, onSelectTask }) {
  if (loading) {
    return (
      <div className="task-loading-state">
        Loading tasks...
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="task-empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="9" x2="15" y2="15" />
          <line x1="15" y1="9" x2="9" y2="15" />
        </svg>
        <p>No tasks here yet</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => {
        const taskId = task._id || task.id;
        const priority = task.priority || "medium";
        const status = task.status || (task.completed ? "done" : "todo");

        return (
          <li key={taskId} className={`task-item priority-${priority}`}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(event) => onToggleTask(taskId, event.target.checked)}
              />
              <button
                type="button"
                className={task.completed ? "task-title-button completed" : "task-title-button"}
                onClick={() => onSelectTask(task)}
              >
                {task.title}
              </button>
              <div className="task-badges">
                <span className="task-badge badge-status">{status}</span>
                <span className={`task-badge badge-priority priority-${priority}`}>{priority}</span>
              </div>
            </label>
            <button
              type="button"
              className="task-delete-btn"
              onClick={() => onDeleteTask(taskId)}
              aria-label={`Delete ${task.title}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15, display: 'inline' }}>
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default TaskList;
