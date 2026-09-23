"use client";
import { useState } from "react";
import { Binary, Braces, CircleDotDashed, Cpu, DatabaseZap, Fingerprint, GitBranch, Network, Orbit, Radar, ShieldEllipsis, Unplug, Waves } from "lucide-react";

const orbitNodes=["Context envelope","Signal lattice","Policy fabric","Decision plane","Assurance channel","Secure continuation"];

function InteractiveCore(){
  const [expanded,setExpanded]=useState(false);
  const toggle=()=>setExpanded(value=>!value);
  return <div className={`interactive-architecture ${expanded?"is-expanded":""}`} data-open={expanded?"true":"false"} onClick={toggle}>
    <div className="cosmic-field" aria-hidden="true">{Array.from({length:36},(_,i)=><i key={i} style={{"--angle":`${i*47}deg`,"--size":`${2+i%3}px`,"--distance":`${75+(i%9)*33}px`,"--distance-end":`${110+(i%9)*36}px`,"--duration":`${4+(i%7)*.7}s`,"--delay":`${i*-.13}s`,"--opacity":`${.28+(i%5)*.12}`} as React.CSSProperties}/>)}</div>
    <div className="galaxy-wave" aria-hidden="true"/>
    <button className="split-core" type="button" aria-expanded={expanded} onKeyDown={event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();toggle()}}}>
      <span className="core-slices" aria-hidden="true">{Array.from({length:6},(_,i)=><i key={i} style={{"--slice":i} as React.CSSProperties}/>)}</span>
      <Braces/><b>AX-Φ</b><small>{expanded?"Collapse system":"Explore system"}</small>
    </button>
    <div className="orbit-nodes" aria-hidden={!expanded}>{orbitNodes.map((label,i)=><div className="orbit-node" key={label} style={{"--delay":`${i*-.55}s`} as React.CSSProperties}><span>{String(i+1).padStart(2,"0")}</span><b>{label}</b></div>)}</div>
    <p className="core-instruction">{expanded?"Six control planes revealed — click anywhere to close.":"Click or tap the centre to reveal six control planes."}</p>
  </div>
}

export function ArchitectureVeil({interactive=false}:{interactive?:boolean}){
  const nodes=[
    {icon:Fingerprint,label:"Boundary Γ",code:"ΓX-04"},{icon:Binary,label:"Vector mesh",code:"VM-17"},
    {icon:Cpu,label:"Tensor plane",code:"TP-09"},{icon:Orbit,label:"State manifold",code:"SM-31"},
    {icon:DatabaseZap,label:"Envelope Ω",code:"ΩE-12"},{icon:ShieldEllipsis,label:"Quorum veil",code:"QV-08"},
    {icon:GitBranch,label:"Branch lattice",code:"BL-42"},{icon:Radar,label:"Phase aperture",code:"PA-23"},
    {icon:Waves,label:"Entropy relay",code:"ER-71"},{icon:Unplug,label:"Null boundary",code:"NB-16"},
    {icon:Network,label:"Flux channel",code:"FC-55"},{icon:Braces,label:"Resolver Δ",code:"ΔR-28"},
  ];
  return <section className={`architecture-veil ${interactive?"interactive-only":""}`}><div className="section-heading"><span className="eyebrow"><Network/> Public topology abstraction</span><h2>A multi-plane orchestration fabric.</h2><p>This view deliberately obscures execution order, decision logic, data movement and enforcement boundaries. Implementation details are available only during qualified technical discussions.</p></div>{interactive?<InteractiveCore/>:<><div className="veil-grid">{nodes.map(({icon:Icon,label,code},i)=><article key={code} style={{"--delay":i} as React.CSSProperties}><Icon/><b>{label}</b><span>{code}</span><i/><small>{i%3===0?"Non-deterministic state":i%3===1?"Rotating envelope":"Ephemeral channel"}</small></article>)}<div className="veil-core"><Braces/><b>AX-Φ</b><span>PROPRIETARY ORCHESTRATION</span><small>Topology intentionally non-sequential</small></div><div className="veil-ring r1"/><div className="veil-ring r2"/><div className="veil-ring r3"/></div><div className="veil-legend"><span><CircleDotDashed/> Plane α</span><span><CircleDotDashed/> Plane γ</span><span><CircleDotDashed/> Plane ω</span><strong>Logical relationships, processing order and control mechanisms are intentionally undisclosed.</strong></div></>}</section>
}
