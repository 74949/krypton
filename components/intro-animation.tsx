"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const tracePaths = [
  "M0 150 H340 L470 280 H650", "M0 285 H290 L430 425 H650",
  "M0 435 H350 L455 540 H650", "M0 700 H270 L440 530 H650",
  "M1600 150 H1260 L1130 280 H950", "M1600 285 H1310 L1170 425 H950",
  "M1600 435 H1250 L1145 540 H950", "M1600 700 H1330 L1160 530 H950",
];

export function IntroAnimation() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("aronxx-tech-intro-seen")) {
      const immediate = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(immediate);
    }
    const timer = window.setTimeout(() => {
      sessionStorage.setItem("aronxx-tech-intro-seen", "1");
      setVisible(false);
    }, 4900);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("aronxx-tech-intro-seen", "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="chip-intro" role="status" aria-label="Aronxx Tech secure interface initializing">
      <div className="intro-vignette" aria-hidden="true" />
      <div className="pcb-grid" aria-hidden="true" />
      <svg className="circuit-traces" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="trace-light" x1="0" x2="1"><stop offset="0" stopColor="#16d7ff" stopOpacity="0" /><stop offset=".48" stopColor="#16d7ff" /><stop offset="1" stopColor="#9b78ff" stopOpacity=".12" /></linearGradient>
          <filter id="trace-glow"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        {tracePaths.map((path, index) => <path key={path} d={path} pathLength="1" className={`trace trace-${index + 1}`} />)}
        {[150, 285, 435, 700].map((y) => <circle key={`l-${y}`} cx="24" cy={y} r="5" className="trace-node" />)}
        {[150, 285, 435, 700].map((y) => <circle key={`r-${y}`} cx="1576" cy={y} r="5" className="trace-node" />)}
      </svg>

      <div className="processor-stage" aria-hidden="true">
        <div className="energy-ring ring-outer" /><div className="energy-ring ring-inner" />
        <div className="chip-socket"><span /><span /><span /><span /></div>
        <div className="processor-wrap">
          <Image className="processor-image" src="/aronxx-tech-processor.png" alt="" width={2048} height={2048} priority />
          <div className="processor-scan" /><div className="processor-specular" />
        </div>
        <div className="chip-shadow" />
      </div>

      <div className="intro-brand"><span className="brand-mark"><Image src="/aronxx-tech-logo.png" alt="" width={1536} height={1024} priority /></span><b>ARONXX TECH</b><i>SECURE AI GATEWAY</i></div>
      <div className="boot-status">
        <div className="status-copy"><span>HARDWARE ROOT OF TRUST</span><b>ESTABLISHING SECURE CHANNEL</b></div>
        <div className="boot-track"><i /></div>
        <div className="boot-meta"><span>CORE // AT-01</span><span className="boot-percent">100%</span></div>
      </div>
      <button className="intro-skip" onClick={dismiss}>Skip sequence</button>
    </div>
  );
}
