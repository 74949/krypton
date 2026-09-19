import { Binary, Braces, CircleDotDashed, Cpu, DatabaseZap, Fingerprint, GitBranch, Network, Orbit, Radar, ShieldEllipsis, Unplug, Waves } from "lucide-react";

export function ArchitectureVeil(){
  const nodes=[
    {icon:Fingerprint,label:"Boundary Γ",code:"ΓX-04"},{icon:Binary,label:"Vector mesh",code:"VM-17"},
    {icon:Cpu,label:"Tensor plane",code:"TP-09"},{icon:Orbit,label:"State manifold",code:"SM-31"},
    {icon:DatabaseZap,label:"Envelope Ω",code:"ΩE-12"},{icon:ShieldEllipsis,label:"Quorum veil",code:"QV-08"},
    {icon:GitBranch,label:"Branch lattice",code:"BL-42"},{icon:Radar,label:"Phase aperture",code:"PA-23"},
    {icon:Waves,label:"Entropy relay",code:"ER-71"},{icon:Unplug,label:"Null boundary",code:"NB-16"},
    {icon:Network,label:"Flux channel",code:"FC-55"},{icon:Braces,label:"Resolver Δ",code:"ΔR-28"},
  ];
  return <section className="architecture-veil"><div className="section-heading"><span className="eyebrow"><Network/> Public topology abstraction</span><h2>A multi-plane orchestration fabric.</h2><p>This view deliberately obscures execution order, decision logic, data movement and enforcement boundaries. Implementation details are available only during qualified technical discussions.</p></div><div className="veil-grid">{nodes.map(({icon:Icon,label,code},i)=><article key={code} style={{"--delay":i} as React.CSSProperties}><Icon/><b>{label}</b><span>{code}</span><i/><small>{i%3===0?"Non-deterministic state":i%3===1?"Rotating envelope":"Ephemeral channel"}</small></article>)}<div className="veil-core"><Braces/><b>AX-Φ</b><span>PROPRIETARY ORCHESTRATION</span><small>Topology intentionally non-sequential</small></div><div className="veil-ring r1"/><div className="veil-ring r2"/><div className="veil-ring r3"/></div><div className="veil-legend"><span><CircleDotDashed/> Plane α</span><span><CircleDotDashed/> Plane γ</span><span><CircleDotDashed/> Plane ω</span><strong>Logical relationships, processing order and control mechanisms are intentionally undisclosed.</strong></div></section>
}
