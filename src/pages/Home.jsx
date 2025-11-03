import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="card">
      <h1 className="page-title">Drone Console</h1>

      <p style={{ color: "var(--muted)", marginBottom: "20px" }}>
        Centralized monitoring and operational command panel.
      </p>

      <div className="grid" style={{ marginTop: "16px" }}>
        <Link to="/config" className="feature-card">
          <h2>View Config</h2>
          <p>Inspect drone identity, attributes, and metadata.</p>
        </Link>

        <Link to="/log" className="feature-card">
          <h2>Log Temperature</h2>
          <p>Record environmental metrics and submit data points.</p>
        </Link>

        <Link to="/logs" className="feature-card">
          <h2>View Logs</h2>
          <p>Analyze flight telemetry and operational footprint.</p>
        </Link>
      </div>
    </section>
  );
}
