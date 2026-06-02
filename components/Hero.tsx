"use client";

import React, { useEffect, useState } from "react";

const backgroundVideos = ["/video/server01.mp4", "/video/server02.mp4"];

const phrases = [
  "Network Engineer ",
  "Network Automation ",
  "Network Infrastructure Development ",
  "Firewall Expert ",
  "Security Operations Specialist ",
];

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(100);
  const [animationKey, setAnimationKey] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey((prev) => prev + 1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleType = () => {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        setDisplayText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        setTypeSpeed(50);
      } else {
        setDisplayText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        setTypeSpeed(100);
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        setIsDeleting(true);
        setTypeSpeed(2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setTypeSpeed(500);
      }
    };

    const timer = setTimeout(handleType, typeSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex, typeSpeed]);

  return (
    <section className="relative min-h-[500px] rounded-xl overflow-hidden glass-card group" id="hero">
      <div className="absolute inset-0 z-0 bg-black">
        <video
          key={backgroundVideos[currentVideoIndex]}
          autoPlay
          muted
          playsInline
          onEnded={() => setCurrentVideoIndex((prev) => (prev + 1) % backgroundVideos.length)}
          className="w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-1000"
          src={backgroundVideos[currentVideoIndex]}
        />
      </div>
      <div className="relative z-10 h-full flex flex-col md:flex-row p-8 md:p-12 gap-12 items-center">
        <div className="flex-1 space-y-8">
          <div>
            <span className="inline-block px-3 py-1 border border-primary-container/30 bg-primary-container/10 text-label-mono font-label-mono text-[12px] text-primary-container mb-6">
              NETWORK AND CLOUD NETWORK AUTOMATION ENGINEER
            </span>
            <h1 className="text-headline-lg md:text-headline-xl font-headline-xl leading-tight text-5xl">
              Sarowar Hosen
            </h1>
            <p className=" text-2xl">
              <span className="text-primary-container neon-text-glow">
                {displayText}
              </span>
              <span className="text-primary-container terminal-cursor">_</span>
            </p>
          </div>

          {/* Terminal Log Animation */}
          <div key={animationKey} className="bg-black/60 backdrop-blur-md p-6 border border-white/5 rounded-lg font-label-mono text-label-mono text-[13px] text-secondary-fixed max-w-xl">
            <div className="terminal-flicker">
              <div className="flex gap-2 mb-2">
                <span className="text-error shrink-0">sarowar@core:</span>
                <div className="relative">
                  <span className="animate-type inline-block">
                    ~ $ ansible-playbook myskill.yml
                  </span>
                </div>
              </div>
              <div className="text-on-surface-variant terminal-glow">
                <div className="step-1">
                  &gt; [PLAY 3] Switching & Routing...{" "}
                  <span className="text-secondary-fixed">[DONE]</span>
                </div>
                <div className="step-2">
                  &gt; [PLAY 2] Configuring Fortigate Fi...{" "}
                  <span className="text-secondary-fixed">[OK]</span>
                </div>
                <div className="step-3">
                  &gt; [PLAY 1] Network Automation ...{" "}
                  <span className="text-secondary-fixed">[DONE]</span>
                </div>
                <div className="step-4">
                  &gt; [PLAY 1] Provisioning AWS VPC...{" "}
                  <span className="text-secondary-fixed">[OK]</span>
                </div>
                <div className="step-5">
                  &gt; STATUS: Infrastructure fully automated
                  <span className="terminal-cursor inline-block w-2 h-4 bg-primary-container align-middle ml-1 shadow-[0_0_8px_var(--color-primary-container)]"></span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="bg-primary-container text-on-primary-container px-8 py-3 font-label-caps text-label-caps hover:shadow-[0_0_20px_rgba(var(--color-primary-container-rgb),0.4)] transition-all active:scale-95">
              NETWORK PROJECTS
            </button>
            <button className="border border-white/10 px-8 py-3 font-label-caps text-label-caps hover:bg-white/5 transition-all text-on-surface">
              DOWNLOAD CV
            </button>
          </div>
        </div>

<section className="lg:col-span-6 relative flex flex-col space-y-4 w-[420px]">
  {/* Floating Status Box */}
  <div className="absolute -top-6 -left-4 bg-slate-950/90 border border-slate-800 p-3 rounded-xl text-[10px] font-mono text-slate-400 z-20 max-w-[180px] pointer-events-none hidden sm:block shadow-2xl backdrop-blur-md">
    <span className="text-primary-container">{`> NODECORE:10022`}</span>
    <br />
    <span>TRAFFIC LOAD: 43%</span>
    <br />
    <span>VPN STATUS: ACTIVE</span>
    <br />
    <span className="text-emerald-400">PING STATUS: 0ms</span>
  </div>

  {/* Main Card */}
  <div className="w-full bg-slate-950/40 border border-slate-800/80 rounded-2xl p-6 min-h-[360px] flex items-center justify-center relative overflow-hidden backdrop-blur-sm shadow-[0_0_40px_rgba(var(--color-primary-container-rgb),0.06)]">

    {/* Cyber Grid Background */}
    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(rgba(var(--color-primary-container-rgb),0.3)_1px,transparent_1px)] bg-[size:16px_16px]" />

    {/* Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-container)]/5 via-transparent to-purple-500/5" />

    {/* SVG Network Topology */}
    <svg
      className="w-full max-w-[500px] h-auto relative z-10"
      viewBox="0 0 400 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Base Connections */}
      <path
        d="M60 120 L150 70 M60 120 L150 170 M150 70 L260 70 M150 170 L260 170 M260 70 L340 120 M260 170 L340 120 M150 70 L150 170 M260 70 L260 170"
        stroke="#1e293b"
        strokeWidth="2"
      />

      {/* Animated Traffic Lines */}
      <path
        d="M60 120 L150 70 L260 170 L340 120"
        stroke="var(--color-primary-container)"
        strokeWidth="2"
        strokeDasharray="6 6"
        className="animate-[dash_4s_linear_infinite]"
      />

      <path
        d="M60 120 L150 170 L260 70"
        stroke="#a855f7"
        strokeWidth="2"
        strokeDasharray="3 3"
        className="animate-[dash_6s_linear_infinite]"
      />

      {/* Animated Packet */}
      <circle r="4" fill="var(--color-primary-container)">
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          path="M60 120 L150 70 L260 170 L340 120"
        />
      </circle>

      <circle r="4" fill="#a855f7">
        <animateMotion
          dur="6s"
          repeatCount="indefinite"
          path="M60 120 L150 170 L260 70"
        />
      </circle>

      {/* Ping Pulse Effects */}
      <circle
        cx="60"
        cy="120"
        r="20"
        stroke="var(--color-primary-container)"
        strokeWidth="1"
        fill="transparent"
        className="animate-ping opacity-20"
      />

      <circle
        cx="340"
        cy="120"
        r="20"
        stroke="var(--color-primary-container)"
        strokeWidth="1"
        fill="transparent"
        className="animate-ping opacity-20"
      />

      {/* Network Nodes */}
      {[
        { cx: 60, cy: 120, color: "var(--color-primary-container)", label: "R1" },
        { cx: 150, cy: 70, color: "#a855f7", label: "S1" },
        { cx: 150, cy: 170, color: "var(--color-primary-container)", label: "S2" },
        { cx: 260, cy: 70, color: "var(--color-primary-container)", label: "S3" },
        { cx: 260, cy: 170, color: "#a855f7", label: "S4" },
        { cx: 340, cy: 120, color: "var(--color-primary-container)", label: "FW" },
      ].map((node, index) => (
        <g
          key={index}
          className="transition-all duration-300 hover:scale-110 cursor-pointer"
        >
          {/* Outer Glow */}
          <circle
            cx={node.cx}
            cy={node.cy}
            r="18"
            fill={node.color}
            opacity="0.15"
          />

          {/* Main Circle */}
          <circle
            cx={node.cx}
            cy={node.cy}
            r="14"
            fill="#020617"
            stroke={node.color}
            strokeWidth="2"
            style={{
              filter: `drop-shadow(0 0 8px ${node.color})`,
            }}
          />

          {/* Label */}
          <text
            x={node.cx - 6}
            y={node.cy + 4}
            fill={node.color}
            fontFamily="monospace"
            fontSize="10"
            fontWeight="bold"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>

    {/* Bottom Status */}
    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-500 z-20">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        NETWORK SECURE
      </div>

      <div className="text-cyan-400">
        CISCO • FORTINET • CLOUD
      </div>
    </div>
  </div>
</section>





      </div>
    </section>
  );
};

export default Hero;
