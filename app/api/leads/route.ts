import { NextResponse } from "next/server";
import { insertLead, sendLeadEmail, type LeadRecord } from "@/lib/server/leads";

export async function POST(request: Request) {
  try {
    const body = await request.json() as Partial<LeadRecord>;
    if (!body.name || !body.company || !body.work_email || !["demo", "pilot"].includes(body.request_type || "")) return NextResponse.json({ error: "Required fields are missing." }, { status: 400 });
    const email = String(body.work_email).trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Please enter a valid work email." }, { status: 400 });
    const lead: LeadRecord = { request_type: body.request_type!, name: String(body.name).slice(0,120), company: String(body.company).slice(0,160), work_email: email, job_title: String(body.job_title || "").slice(0,120), company_size: String(body.company_size || "").slice(0,60), ai_tools: String(body.ai_tools || "").slice(0,500), security_approach: String(body.security_approach || "").slice(0,2000), interest: String(body.interest || "").slice(0,30), message: String(body.message || "").slice(0,2000) };
    const saved = await insertLead(lead);
    let emailSent = true;
    try { await sendLeadEmail(lead); } catch { emailSent = false; }
    return NextResponse.json({ ok: true, id: saved[0]?.id, emailSent });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Request could not be processed." }, { status: 500 });
  }
}
