export type LeadRecord = {
  id?: string; created_at?: string; request_type: "demo" | "pilot"; name: string;
  company: string; work_email: string; job_title?: string; company_size?: string;
  ai_tools?: string; security_approach?: string; interest?: string; message?: string;
};

const supabaseUrl = () => process.env.SUPABASE_URL?.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
const serviceKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY;

function supabaseHeaders(includeBody = false) {
  const key = serviceKey()!;
  const headers: Record<string,string> = { apikey: key };
  // Legacy service-role keys are JWTs and require Authorization. New sb_secret keys
  // authenticate through apikey and must not be sent as Bearer JWTs.
  if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`;
  if (includeBody) headers["Content-Type"] = "application/json";
  return headers;
}

export function backendConfigured() { return Boolean(supabaseUrl() && serviceKey()); }

export async function insertLead(lead: LeadRecord) {
  if (!backendConfigured()) throw new Error("Backend environment variables are not configured.");
  const response = await fetch(`${supabaseUrl()}/rest/v1/demo_requests`, {
    method: "POST",
    headers: { ...supabaseHeaders(true), Prefer: "return=representation" },
    body: JSON.stringify(lead),
  });
  if (!response.ok) throw new Error(`Database rejected the request (${response.status}). Check the Supabase URL, secret key and demo_requests table.`);
  return (await response.json()) as LeadRecord[];
}

export async function getLeads() {
  if (!backendConfigured()) return [] as LeadRecord[];
  const response = await fetch(`${supabaseUrl()}/rest/v1/demo_requests?select=*&order=created_at.desc`, {
    headers: supabaseHeaders(), cache: "no-store",
  });
  if (!response.ok) throw new Error("Unable to load lead records.");
  return (await response.json()) as LeadRecord[];
}

export async function sendLeadEmail(lead: LeadRecord) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { skipped: true };
  const recipient = process.env.LEAD_NOTIFICATION_EMAIL || "goransh1601@gmail.com";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || "Aronxx Tech Leads <onboarding@resend.dev>", to: [recipient],
      subject: `New Aronxx Tech ${lead.request_type === "pilot" ? "pilot" : "demo"} request — ${lead.company}`,
      html: `<h2>New Aronxx Tech request</h2><p><b>Name:</b> ${escapeHtml(lead.name)}</p><p><b>Company:</b> ${escapeHtml(lead.company)}</p><p><b>Email:</b> ${escapeHtml(lead.work_email)}</p><p><b>Role:</b> ${escapeHtml(lead.job_title || "Not supplied")}</p><p><b>Type:</b> ${lead.request_type}</p><p><b>Message:</b> ${escapeHtml(lead.message || lead.security_approach || "Not supplied")}</p>`,
    }),
  });
  if (!response.ok) throw new Error("Email notification could not be sent.");
  return response.json();
}

function escapeHtml(value: string) { return value.replace(/[&<>'"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[c]!)); }

export function authorized(request: Request) {
  const expected = process.env.ADMIN_EXPORT_TOKEN;
  if (!expected) return false;
  const url = new URL(request.url);
  return request.headers.get("x-admin-token") === expected || url.searchParams.get("token") === expected;
}
