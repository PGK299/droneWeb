import { useEffect, useState } from "react";
import { createLog, fetchConfig } from "../api";

export default function TempForm() {
  const [cfg, setCfg] = useState(null);
  const [celsius, setCelsius] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchConfig()
      .then(setCfg)
      .catch(() => {});
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setToast(null);
    try {
      const res = await createLog(celsius);
      setToast({ type: "ok", msg: `Created: ${res.created || "success"}` });
      setCelsius("");
    } catch (e) {
      setToast({ type: "err", msg: e.message || "Submit failed" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="card">
      <h1 className="mb">Temperature Log Form</h1>
      {cfg && (
        <div className="muted mb">
          {cfg.drone_name} • {cfg.drone_id} • {cfg.country}
        </div>
      )}
      <form onSubmit={onSubmit} className="vstack">
        <label className="mb">
          Temperature (°C)
          <input
            type="number"
            step="0.1"
            required
            value={celsius}
            onChange={(e) => setCelsius(e.target.value)}
          />
        </label>
        <button disabled={busy}>{busy ? "Submitting…" : "Submit"}</button>
      </form>

      {toast && (
        <div className={toast.type === "ok" ? "toast ok" : "toast err"}>
          {toast.msg}
        </div>
      )}
    </section>
  );
}
