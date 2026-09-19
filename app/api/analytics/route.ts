import { NextResponse } from "next/server";
import { authorized, getLeads } from "@/lib/server/leads";

type KevItem = { vendorProject: string; dateAdded: string; knownRansomwareCampaignUse: string };

export async function GET(request: Request) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const leads = await getLeads();
  const byType = count(leads.map(x => x.request_type || "unknown"));
  const bySize = count(leads.map(x => x.company_size || "Not supplied"));
  const byInterest = count(leads.map(x => x.interest || (x.request_type === "demo" ? "Demo" : "Not supplied")));
  const byDay = count(leads.map(x => (x.created_at || "").slice(0,10) || "Unknown"));
  const tools = count(leads.flatMap(x => (x.ai_tools || "Not supplied").split(/[,;/]/).map(v => v.trim()).filter(Boolean)));
  let threat = { total: 0, ransomware: 0, added30d: 0, vendors: {} as Record<string, number>, updated: null as string | null, source: "CISA Known Exploited Vulnerabilities Catalog" };
  try {
    const response = await fetch("https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json", { next: { revalidate: 3600 } });
    const feed = await response.json() as { dateReleased?: string; vulnerabilities?: KevItem[] };
    const items = feed.vulnerabilities || [];
    const cutoff = Date.now() - 30 * 86400000;
    threat = { total: items.length, ransomware: items.filter(x => x.knownRansomwareCampaignUse === "Known").length, added30d: items.filter(x => Date.parse(x.dateAdded) >= cutoff).length, vendors: top(count(items.map(x => x.vendorProject || "Unknown")), 8), updated: feed.dateReleased || new Date().toISOString(), source: "CISA Known Exploited Vulnerabilities Catalog" };
  } catch { /* retain explicit unavailable state */ }
  return NextResponse.json({ generatedAt: new Date().toISOString(), leads: { total: leads.length, byType, bySize, byInterest, byDay, tools }, threat }, { headers: { "Cache-Control": "no-store" } });
}

function count(values: string[]) { return values.reduce<Record<string, number>>((acc, value) => { acc[value] = (acc[value] || 0) + 1; return acc; }, {}); }
function top(values: Record<string, number>, limit: number) { return Object.fromEntries(Object.entries(values).sort((a,b) => b[1]-a[1]).slice(0,limit)); }
