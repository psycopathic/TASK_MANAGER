function TaskFilters({ filters, onFiltersChange }) {
  function handleChange(event) {
    const { name, value } = event.target;
    onFiltersChange({ [name]: value || null });
  }

  return (
    <div className="filters-wrapper">
      <h2 className="filters-heading">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        Filters
      </h2>
      <section className="task-filters" id="task-filters">
        <div className={`filter-group search-input-wrap${filters.search ? " active-filter" : ""}`}>
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            id="filter-search"
            type="text"
            name="search"
            placeholder="Search tasks..."
            value={filters.search || ""}
            onChange={(event) => onFiltersChange({ search: event.target.value })}
          />
        </div>

        <div className={`filter-group${filters.status ? " active-filter" : ""}`}>
          <select id="filter-status" name="status" value={filters.status || ""} onChange={handleChange}>
            <option value="">All Statuses</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className={`filter-group${filters.priority ? " active-filter" : ""}`}>
          <select id="filter-priority" name="priority" value={filters.priority || ""} onChange={handleChange}>
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="filter-group">
          <select id="filter-sort" name="sort" value={filters.sort || "-createdAt"} onChange={handleChange}>
            <option value="-createdAt">Newest</option>
            <option value="createdAt">Oldest</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>
      </section>
    </div>
  );
}

export default TaskFilters;
