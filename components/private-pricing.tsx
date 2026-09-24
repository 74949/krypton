"use client";
import { useState } from "react";
import { Check, KeyRound, LockKeyhole, LogOut, ShieldCheck, Sparkles } from "lucide-react";

type Package={name:string;description:string;price:string;period:string;accent:string;recommended:boolean;features:string[]};
type PricingData={title:string;currency:string;note:string;packages:Package[]};

export function PrivatePricing(){
  const [token,setToken]=useState("");
  const [data,setData]=useState<PricingData|null>(null);
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  async function open(){setLoading(true);setError("");try{const response=await fetch("/api/private-pricing",{cache:"no-store",headers:{"x-admin-token":token}});const result=await response.json() as PricingData&{error?:string};if(!response.ok)throw new Error(result.error||"Unable to open pricing");setData(result)}catch(value){setError(value instanceof Error?value.message:"Unable to open pricing")}finally{setLoading(false)}}
  if(!data)return <div className="pricing-login"><div className="pricing-lock"><LockKeyhole/></div><span>Aronxx Tech · Restricted</span><h1>Private pricing room</h1><p>Enter the administrator security key to view internal commercial packages.</p><label><KeyRound/><input type="password" value={token} onChange={event=>setToken(event.target.value)} onKeyDown={event=>{if(event.key==="Enter"&&token)void open()}} placeholder="Security key" autoComplete="current-password"/></label><button className="btn" onClick={open} disabled={!token||loading}>{loading?"Verifying…":"Unlock pricing"}</button>{error&&<p className="pricing-error">{error}</p>}<small>This page is excluded from navigation and search indexing.</small></div>;
  return <main className="private-pricing"><div className="pricing-ambient a"/><div className="pricing-ambient b"/><header><div><span><ShieldCheck/> Authorized commercial view</span><h1>{data.title}</h1><p>Clear starting packages for qualified conversations. Final scope and pricing remain subject to assessment.</p></div><button onClick={()=>{setData(null);setToken("")}}><LogOut/> Lock page</button></header><section className="pricing-cards">{data.packages.map(item=><article className={`pricing-card ${item.recommended?"recommended":""} accent-${item.accent}`} key={item.name}>{item.recommended&&<div className="recommended-label"><Sparkles/> Recommended</div>}<span className="package-name">{item.name}</span><p>{item.description}</p><div className="package-price"><b>{item.price}</b><small>{item.period}</small></div><div className="package-rule"/><ul>{item.features.map(feature=><li key={feature}><Check/>{feature}</li>)}</ul><button className="package-action">Select {item.name}</button></article>)}</section><footer><ShieldCheck/><div><b>Internal pricing guidance</b><p>{data.note} Taxes, onboarding, integrations and custom compliance requirements may be priced separately.</p></div></footer></main>;
}
