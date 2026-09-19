import { NextResponse } from "next/server";
import { backendConfigured } from "@/lib/server/leads";

export async function GET(){
  return NextResponse.json({
    status:"ok",
    service:"Aronxx Tech website",
    databaseConfigured:backendConfigured(),
    emailConfigured:Boolean(process.env.RESEND_API_KEY && process.env.LEAD_NOTIFICATION_EMAIL),
    adminConfigured:Boolean(process.env.ADMIN_EXPORT_TOKEN),
    checkedAt:new Date().toISOString(),
  },{headers:{"Cache-Control":"no-store"}});
}
