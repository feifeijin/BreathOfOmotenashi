const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000';

// ── Chat ──────────────────────────────────────────────────────────
export async function sendChat(
  message: string,
  history: { role: string; content: string }[] = [],
) {
  const res = await fetch(`${BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<{ reply: string }>;
}

// ── TTS ───────────────────────────────────────────────────────────
export async function fetchTTS(text: string): Promise<Blob> {
  const res = await fetch(
    `${BASE}/api/chat/tts?text=${encodeURIComponent(text)}`,
    { method: 'POST' },
  );
  if (!res.ok) throw new Error('TTS failed');
  return res.blob();
}

// ── Agora Token ───────────────────────────────────────────────────
export async function getAgoraToken(channel: string, uid?: number) {
  const res = await fetch(`${BASE}/api/agora/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ channel, uid }),
  });
  if (!res.ok) throw new Error('Agora token failed');
  return res.json() as Promise<{
    token: string;
    channel: string;
    uid: number;
    app_id: string;
  }>;
}

// ── Knowledge ─────────────────────────────────────────────────────
export async function searchKnowledge(query: string, topK = 5) {
  const res = await fetch(`${BASE}/api/knowledge/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, top_k: topK }),
  });
  if (!res.ok) throw new Error('Search failed');
  return res.json() as Promise<{ results: { text: string; score: number }[] }>;
}

// ── TEN Agent ─────────────────────────────────────────────────────
export async function startVoiceAgent(params: {
  channel_name: string;
  uid: number;
  shrine_id?: string;
}) {
  const res = await fetch(`${BASE}/api/agora/start-agent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<{ request_id: string }>;
}

export async function stopVoiceAgent(params: { request_id: string }) {
  const res = await fetch(`${BASE}/api/agora/stop-agent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
