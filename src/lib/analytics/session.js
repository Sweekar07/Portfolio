import { v4 as uuidv4 } from "uuid";

const KEY = "portfolio_session_id";
const KEY_TS = "portfolio_session_last_seen";
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 min

export function getOrCreateSessionId() {
  const now = Date.now();
  const existing = localStorage.getItem(KEY);
  const lastSeen = Number(localStorage.getItem(KEY_TS) || "0");

  if (existing && now - lastSeen < SESSION_TTL_MS) {
    localStorage.setItem(KEY_TS, String(now));
    return existing;
  }

  const newId = uuidv4();
  localStorage.setItem(KEY, newId);
  localStorage.setItem(KEY_TS, String(now));
  return newId;
}
