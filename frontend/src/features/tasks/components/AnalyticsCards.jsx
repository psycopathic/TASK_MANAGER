function AnalyticsCards({ analytics, loading }) {
  if (loading) {
    return (
      <section className="analytics-skeleton" aria-busy="true" aria-label="Loading analytics">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="analytics-skeleton-card" />
        ))}
      </section>
    );
  }

  const percentage = analytics.completionPercentage ?? 0;

  const cards = [
    {
      label: "Total Tasks",
      value: analytics.totalTasks,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
        </svg>
      ),
    },
    {
      label: "Completed",
      value: analytics.completedTasks,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
    {
      label: "Pending",
      value: analytics.pendingTasks,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      label: "Completion",
      value: `${percentage}%`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
      showProgress: true,
    },
  ];

  return (
    <section className="analytics-grid" id="analytics-cards">
      {cards.map((card) => (
        <article key={card.label} className="analytics-card">
          <div className="analytics-icon">{card.icon}</div>
          <p className="analytics-label">{card.label}</p>
          <p className="analytics-value">{card.value}</p>
          {card.showProgress && (
            <div className="analytics-progress-wrap">
              <div className="analytics-progress-track">
                <div
                  className="analytics-progress-fill"
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                  role="progressbar"
                  aria-valuenow={percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          )}
        </article>
      ))}
    </section>
  );
}

export default AnalyticsCards;
