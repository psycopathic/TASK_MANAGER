function PaginationControls({ pagination, onPageChange, loading }) {
  const { page, totalPages, totalCount } = pagination;

  if (!totalCount) {
    return null;
  }

  return (
    <section className="pagination-controls" id="pagination">
      <button
        type="button"
        disabled={loading || page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Previous
      </button>
      <p>
        Page {page} of {totalPages}
      </p>
      <button
        type="button"
        disabled={loading || page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </section>
  );
}

export default PaginationControls;
