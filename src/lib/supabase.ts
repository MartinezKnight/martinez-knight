const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const SESSION_KEY = "mk_pipeline_session";
const REFRESH_KEY = "mk_pipeline_refresh";

export type Lead = {
  id: string;
  created_at: string;
  business_name: string;
  contact_name: string;
  email: string;
  phone: string;
  industry: string;
  location: string;
  stage: string;
  source: string;
  priority: string;
  estimated_value: number | null;
  next_action: string | null;
  follow_up_date: string | null;
  form_data: Record<string, unknown>;
  assessment: Record<string, unknown>;
  notes: string | null;
};

export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

function config() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("The lead system has not been connected yet. Please contact Martinez Knight.");
  }
  return { url: SUPABASE_URL.replace(/\/$/, ""), key: SUPABASE_ANON_KEY };
}

function sessionToken() {
  return sessionStorage.getItem(SESSION_KEY);
}

async function refreshAccessToken() {
  const { url, key } = config();
  const refreshToken = sessionStorage.getItem(REFRESH_KEY);
  if (!refreshToken) {
    signOut();
    throw new Error("Your session has expired. Please sign in again.");
  }

  const response = await fetch(`${url}/auth/v1/token?grant_type=refresh_token`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  const data = await response.json();
  if (!response.ok || !data.access_token || !data.refresh_token) {
    signOut();
    throw new Error(data.msg || data.message || "Your session has expired. Please sign in again.");
  }

  sessionStorage.setItem(SESSION_KEY, data.access_token);
  sessionStorage.setItem(REFRESH_KEY, data.refresh_token);
  return data.access_token as string;
}

async function request(path: string, options: RequestInit = {}, authenticated = false) {
  const { url, key } = config();

  const send = (token: string | null) => fetch(`${url}${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${token || key}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  let response = await send(authenticated ? sessionToken() : null);
  if (authenticated && response.status === 401 && sessionStorage.getItem(REFRESH_KEY)) {
    const freshToken = await refreshAccessToken();
    response = await send(freshToken);
  }

  const body = await response.text();
  if (!response.ok) {
    let message = body || "Request failed.";
    try { const parsed = JSON.parse(body); message = parsed.message || parsed.msg || message; } catch { /* keep response */ }
    throw new Error(message);
  }
  return body ? JSON.parse(body) : null;
}

export async function submitDiscovery(data: Record<string, unknown>) {
  return request("/rest/v1/prospects", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      business_name: data.businessName,
      contact_name: data.contactName,
      email: data.email,
      phone: data.phone,
      industry: data.industry,
      location: data.location,
      source: data.source || "Website discovery form",
      stage: "Form received",
      priority: "Unassessed",
      form_data: data,
      assessment: {},
    }),
  });
}

export async function signIn(email: string, password: string) {
  const { url, key } = config();
  const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.msg || data.message || "Unable to sign in.");
  sessionStorage.setItem(SESSION_KEY, data.access_token);
  sessionStorage.setItem(REFRESH_KEY, data.refresh_token);
  return data.user;
}

export function signOut() {
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(REFRESH_KEY);
}

export function hasSession() {
  return Boolean(sessionToken());
}

export async function getLeads(): Promise<Lead[]> {
  return request("/rest/v1/prospects?select=*&order=created_at.desc", {}, true);
}

export async function updateLead(id: string, patch: Partial<Lead>) {
  return request(`/rest/v1/prospects?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(patch),
  }, true);
}

export async function createLead(data: Partial<Lead>) {
  return request("/rest/v1/prospects", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(data),
  }, true);
}

const PUBLIC_APPLICATION_TABLES = ["candidate_applications", "training_applications"] as const;
type PublicApplicationTable = typeof PUBLIC_APPLICATION_TABLES[number];

export async function submitApplication(table: PublicApplicationTable, data: Record<string, unknown>) {
  if (!PUBLIC_APPLICATION_TABLES.includes(table)) throw new Error("Unsupported application type.");
  return request(`/rest/v1/${table}`, {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(data),
  });
}
