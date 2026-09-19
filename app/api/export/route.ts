import { getLeads, authorized } from "@/lib/server/leads";
import * as XLSX from "xlsx";

export async function GET(request: Request) {
  if (!authorized(request)) return new Response("Unauthorized", { status: 401 });
  const leads = await getLeads();
  const rows = leads.map((lead, index) => ({ "Sr No.": index + 1, "Received At": lead.created_at, "Request Type": lead.request_type, Name: lead.name, Company: lead.company, "Work Email": lead.work_email, "Job Title": lead.job_title, "Company Size": lead.company_size, "AI Tools": lead.ai_tools, "Security Approach": lead.security_approach, Interest: lead.interest, Message: lead.message }));
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(rows);
  worksheet["!cols"] = [8,22,14,20,24,28,20,14,30,40,12,45].map(wch => ({ wch }));
  XLSX.utils.book_append_sheet(workbook, worksheet, "Aronxx Tech Leads");
  const output = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  return new Response(output, { headers: { "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Content-Disposition": `attachment; filename="Aronxx_Tech_Lead_Register_${new Date().toISOString().slice(0,10)}.xlsx"`, "Cache-Control": "no-store" } });
}
