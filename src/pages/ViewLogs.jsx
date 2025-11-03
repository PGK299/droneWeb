import { useEffect, useState } from "react";
import { fetchLogs } from "../api";

// UTC Bangkok
const TZ = "Asia/Bangkok";
const LOCALE = "th-TH";
const fmt = new Intl.DateTimeFormat(LOCALE, {
  timeZone: TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});
function formatCreated(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso ?? "-";
  return fmt.format(d).replace(",", "");
}

const PAGE_SIZE = 6;
const MAX_ROWS = 12;

export default function ViewLogs() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setError("");
    setRows([]);
    fetchLogs(1, MAX_ROWS)
      .then(({ rows }) => setRows((rows || []).slice(0, MAX_ROWS)))
      .catch((e) => setError(e.message || "Load failed"));
  }, []);

  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const current = rows.slice(start, start + PAGE_SIZE);

  function prev() {
    if (page > 1) setPage(page - 1);
  }
  function next() {
    if (page < pageCount) setPage(page + 1);
  }

  if (error) {
    return (
      <section className="card error">
        <div>Load failed: {error}</div>
        <button onClick={() => location.reload()}>Retry</button>
      </section>
    );
  }
  if (rows.length === 0) return <section className="card">Loading…</section>;

  return (
    <section className="card">
      <h1 className="page-title logs">Temperature Logs</h1>

      <div className="table-scroll">
        <table className="table table-modern">
          <thead>
            <tr>
              <th>Created</th>
              <th>Country</th>
              <th>Drone ID</th>
              <th>Drone Name</th>
              <th>°C</th>
            </tr>
          </thead>
          <tbody>
            {current.map((r, i) => (
              <tr key={i}>
                <td>{formatCreated(r.created)}</td>
                <td>{r.country}</td>
                <td>{r.drone_id}</td>
                <td>{r.drone_name}</td>
                <td>{r.celsius}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Centered pagination */}
      <div className="pagination">
        <button className="btn btn-ghost" onClick={prev} disabled={page === 1}>
          ‹ Prev
        </button>
        <div className="page-indicator">
          Page <strong>{page}</strong> / {pageCount}
        </div>
        <button
          className="btn btn-primary"
          onClick={next}
          disabled={page === pageCount}
        >
          Next ›
        </button>
      </div>
    </section>
  );
}
