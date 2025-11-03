import { useEffect, useState } from "react";
import { fetchConfig, fetchStatus } from "../api";

export default function ViewConfig() {
  const [cfg, setCfg] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const [ts, setTs] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [c, s] = await Promise.all([fetchConfig(), fetchStatus()]);
        if (!mounted) return;
        setCfg(c);
        setStatus(s);
        setTs(new Date().toLocaleString());
      } catch (e) {
        setError(e.message || "Load failed");
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (error) {
    return (
      <section className="card error">
        <div>Load failed: {error}</div>
        <button onClick={() => location.reload()}>Retry</button>
      </section>
    );
  }
  if (!cfg || !status) return <section className="card">Loading…</section>;

  return (
    <section className="card">
      <div className="card-title">
        <h1>Drone Config</h1>
      </div>

      <div className="grid">
        <Field label="Drone ID" value={cfg.drone_id} />
        <Field label="Drone Name" value={cfg.drone_name} />
        <Field label="Light" value={cfg.light} />
        <Field label="Country" value={cfg.country} />
      </div>
    </section>
  );
}

function Field({ label, value }) {
  return (
    <div className="field">
      <div className="label">{label}</div>
      <div className="value">{String(value)}</div>
    </div>
  );
}
