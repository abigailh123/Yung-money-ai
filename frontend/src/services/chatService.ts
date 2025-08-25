const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5000';

export interface BackendChatResponse {
  output: string;
  session_id: string;
}

export interface BackendHistoryMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface BackendHistoryResponse {
  messages: BackendHistoryMessage[];
}

export async function sendChatMessage(query: string, sessionId: string): Promise<BackendChatResponse> {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, session_id: sessionId }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Chat request failed: ${res.status} ${text}`);
  }
  return res.json();
}

export async function fetchChatHistory(sessionId: string): Promise<BackendHistoryResponse> {
  const url = new URL(`${API_BASE}/history`);
  url.searchParams.set('session_id', sessionId);

  const res = await fetch(url.toString());
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`History request failed: ${res.status} ${text}`);
  }
  return res.json();
}


