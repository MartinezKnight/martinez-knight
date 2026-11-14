const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const SESSION_KEY = "mk_pipeline_session";

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

async function request(path: string, options: RequestInit = {}, authenticated = false) {
  const { url, key } = config();
  const token = authenticated ? sessionToken() : null;
  const response = await fetch(`${url}${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${token || key}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const body = await response.text();
  if (!response.ok) {
    let message = body || "Request failed.";
    try { message = JSON.parse(body).message || JSON.parse(body).msg || message; } catch { /* keep response */ }
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
  return data.user;
}

export function signOut() {
  sessionStorage.removeItem(SESSION_KEY);
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
