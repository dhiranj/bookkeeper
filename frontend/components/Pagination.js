export default function Pagination({ page, setPage, totalItems, limit }) {
    const totalPages = Math.ceil(totalItems / limit);
  
    return (
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span> Page {page} of {totalPages} </span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
    );
  }
  