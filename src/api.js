const BASE = import.meta.env.VITE_API_BASE_URL;
export const DRONE_ID = import.meta.env.VITE_DRONE_ID;

let _configCache = null;

async function httpGet(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function httpPost(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchConfig() {
  if (_configCache) return _configCache;
  const data = await httpGet(`${BASE}/configs/${DRONE_ID}`);
  _configCache = data;
  return data;
}

export async function fetchStatus() {
  return httpGet(`${BASE}/status/${DRONE_ID}`);
}

export async function createLog(celsius) {
  const cfg = await fetchConfig();
  const payload = {
    drone_id: cfg.drone_id,
    drone_name: cfg.drone_name,
    country: cfg.country,
    celsius: Number(celsius),
  };
  return httpPost(`${BASE}/logs`, payload);
}

export async function fetchLogs(page = 1, limit = 12) {
  const data = await httpGet(
    `${BASE}/logs/${DRONE_ID}?page=${page}&limit=${limit}`
  );

  if (Array.isArray(data)) {
    return {
      rows: data,
      pagination: {
        page,
        limit,
        totalItems: undefined,
        totalPages: undefined,
        hasPrev: page > 1,
        hasNext: data.length === limit,
      },
    };
  }
  return {
    rows: data.data || [],
    pagination: data.pagination || {
      page,
      limit,
      hasPrev: page > 1,
      hasNext: (data.data || []).length === limit,
    },
  };
}
