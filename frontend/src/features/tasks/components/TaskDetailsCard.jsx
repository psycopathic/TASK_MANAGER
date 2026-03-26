import { useEffect, useState } from "react";

function TaskDetailsCard({ task, onClose, onUpdateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (!task) {
      return;
    }

    setTitle(task.title || "");
    setDescription(task.description || "");
    setStatus(task.status || (task.completed ? "done" : "todo"));
    setPriority(task.priority || "medium");
    setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : "");
    setIsEditing(false);
  }, [task]);

  if (!task) {
    return (
      <article className="task-details-card" aria-live="polite">
        <div className="task-details-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          <p className="task-details-empty-kicker">Details panel</p>
          <h3>Select a task</h3>
          <p className="task-details-description">
            Pick a task from the board to view full details and make quick edits.
          </p>
        </div>
      </article>
    );
  }

  async function handleSave() {
    if (!title.trim()) {
      return;
    }

    const taskId = task._id || task.id;
    await onUpdateTask(taskId, {
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate: dueDate || null,
    });
    setIsEditing(false);
  }

  return (
    <article className="task-details-card" aria-live="polite">
      <div className="task-details-header">
        <div>
          <p className="task-details-panel-label">Task Details</p>
          {isEditing ? (
            <input
              type="text"
              className="task-details-input"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Task title"
            />
          ) : (
            <h3>{task.title}</h3>
          )}
        </div>

        <div className="task-details-actions">
          {isEditing ? (
            <>
              <button type="button" className="btn-save" onClick={handleSave}>
                ✓ Save
              </button>
              <button type="button" onClick={() => setIsEditing(false)}>
                ✕ Cancel
              </button>
            </>
          ) : (
            <button type="button" onClick={() => setIsEditing(true)}>
              ✎ Edit
            </button>
          )}
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      <section className="task-details-section">
        <p className="task-details-meta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Created by: You
        </p>
      </section>

      {isEditing ? (
        <section className="task-details-section">
          <h4>Edit Task</h4>
          <div className="task-details-edit-grid">
            <div className="edit-field">
              <label htmlFor="edit-description">Description</label>
              <textarea
                id="edit-description"
                className="task-details-textarea"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={4}
                placeholder="Task description"
              />
            </div>
            <div className="edit-field">
              <label htmlFor="edit-status">Status</label>
              <select id="edit-status" value={status} onChange={(event) => setStatus(event.target.value)}>
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="edit-field">
              <label htmlFor="edit-priority">Priority</label>
              <select id="edit-priority" value={priority} onChange={(event) => setPriority(event.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="edit-field">
              <label htmlFor="edit-due-date">Due Date</label>
              <input
                id="edit-due-date"
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
              />
            </div>
          </div>
        </section>
      ) : (
        <section className="task-details-section">
          <h4>Description</h4>
          <p className="task-details-description">
            {task.description?.trim() || "No description provided for this task."}
          </p>
          <p className="task-details-meta">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            Status: {task.status || (task.completed ? "done" : "todo")}
          </p>
          <p className="task-details-meta">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Priority: {task.priority || "medium"}
          </p>
          <p className="task-details-meta">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "Not set"}
          </p>
        </section>
      )}
    </article>
  );
}

export default TaskDetailsCard;