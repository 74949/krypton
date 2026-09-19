import { NextResponse } from "next/server";
import { industryProfiles } from "@/lib/industry-intelligence";

type KevItem = { dateAdded?: string; knownRansomwareCampaignUse?: string };

export async function GET() {
  let items: KevItem[] = [];
  let released: string | null = null;
  let live = false;
  try {
    const response = await fetch("https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json", { next: { revalidate: 3600 } });
    if (response.ok) {
      const feed = await response.json() as { dateReleased?: string; vulnerabilities?: KevItem[] };
      items = feed.vulnerabilities || [];
      released = feed.dateReleased || null;
      live = true;
    }
  } catch { /* dashboard retains benchmark mode */ }

  const now = Date.now();
  const recent = items.filter(item => item.dateAdded && Date.parse(item.dateAdded) >= now - 30 * 86400000).length;
  const ransomware = items.filter(item => item.knownRansomwareCampaignUse === "Known").length;
  const pressure = Math.min(6, Math.round(recent / 10));
  const sectors = industryProfiles.map(profile => ({
    ...profile,
    risk: Math.min(99, profile.baseRisk + pressure),
    need: Math.min(99, profile.need + Math.round(pressure / 2)),
  })).sort((a,b) => b.risk - a.risk);

  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(); date.setUTCDate(1); date.setUTCMonth(date.getUTCMonth() - (5-index));
    const key = date.toISOString().slice(0,7);
    return { month: date.toLocaleString("en", { month:"short", timeZone:"UTC" }), count: items.filter(item => item.dateAdded?.startsWith(key)).length };
  });

  return NextResponse.json({
    generatedAt: new Date().toISOString(), live, feedReleasedAt: released,
    threat: { knownExploited: items.length, added30d: recent, ransomware, trend: months },
    sectors,
    methodology: "Sector scores combine fixed exposure benchmarks with the current 30-day CISA KEV pressure signal. Financial ranges are modeled annual exposure for a mid-sized organization, not recorded company losses.",
    sources: [
      { name:"CISA Known Exploited Vulnerabilities Catalog", url:"https://www.cisa.gov/known-exploited-vulnerabilities-catalog", cadence:"Hourly cache / source-led updates" },
      { name:"NIST Cybersecurity Framework 2.0", url:"https://www.nist.gov/cyberframework", cadence:"Methodology reference" },
    ],
  }, { headers: { "Cache-Control":"public, s-maxage=3600, stale-while-revalidate=86400" } });
}
