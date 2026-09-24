import { NextResponse } from "next/server";
import { authorized } from "@/lib/server/leads";

const packages = [
  {
    name: "Launch",
    description: "For small teams beginning controlled generative-AI adoption.",
    price: "₹49,000",
    period: "/ month",
    accent: "cyan",
    recommended: false,
    features: ["Up to 50 protected users", "Core prompt-risk detection", "Standard policy templates", "Security event overview", "Email support"],
  },
  {
    name: "Scale",
    description: "For growing organizations requiring broader visibility and policy control.",
    price: "₹1,49,000",
    period: "/ month",
    accent: "violet",
    recommended: true,
    features: ["Up to 250 protected users", "Advanced detection policies", "Prompt sanitization workflows", "Analytics and Excel exports", "Priority implementation support"],
  },
  {
    name: "Enterprise",
    description: "For regulated or complex organizations with custom deployment needs.",
    price: "Custom",
    period: "annual agreement",
    accent: "blue",
    recommended: false,
    features: ["Custom user volume", "Organization-specific policies", "Private deployment options", "Custom reporting and integrations", "Dedicated success and security reviews"],
  },
];

export async function GET(request:Request){
  if(!authorized(request))return NextResponse.json({error:"Unauthorized"},{status:401});
  return NextResponse.json({title:"Aronxx Tech commercial packages",currency:"INR",note:"Internal draft pricing — editable before sharing with prospects.",packages},{headers:{"Cache-Control":"no-store"}});
}
