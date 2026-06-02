"use client";

import React from "react";

const IdentityMission = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column - Details and Terminal (lg:col-span-7) */}
      <div className="lg:col-span-7 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Career Objective */}
          <div className="glass-card p-6 border-l-4 border-primary-container">
            <h2 className="text-label-caps font-label-caps text-primary-container mb-4 text-[14px]">
              CAREER OBJECTIVE
            </h2>
            <p className="text-body-md text-on-surface-variant leading-relaxed text-[13px]">
              Aspiring Network and Security Engineer seeking a challenging position to utilize my knowledge of CCNA, Fortigate Firewall, Python, and Ansible. Eager to apply hands-on expertise in networking, firewall configuration, and automation to contribute effectively in a dynamic IT environment.
            </p>
          </div>

          {/* Identity */}
          <div className="glass-card p-6 border-l-4 border-secondary-fixed">
            <h2 className="text-label-caps font-label-caps text-secondary-fixed mb-4 text-[14px]">
              IDENTITY
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-label-mono text-on-surface-variant uppercase">
                  Name
                </span>
                <p className="text-label-mono text-primary-container text-[12px]">
                  Sarowar Hosen
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-label-mono text-on-surface-variant uppercase">
                  Network
                </span>
                <p className="text-label-mono text-primary-container text-[12px]">
                  Routing Switching & Wireless
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-label-mono text-on-surface-variant uppercase">
                  Security
                </span>
                <p className="text-label-mono text-primary-container text-[12px]">
                  Fortigate, PaloAlto Firewall
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-label-mono text-on-surface-variant uppercase">
                  Experience
                </span>
                <p className="text-label-mono text-primary-container text-[12px]">
                  2+ Years
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Window */}
        <div className="glass-panel rounded-lg p-4 font-label-mono text-label-mono overflow-hidden border-primary-container/20">
          <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
            <span className="w-3 h-3 rounded-full bg-error"></span>
            <span className="w-3 h-3 rounded-full bg-secondary-fixed"></span>
            <span className="w-3 h-3 rounded-full bg-primary-container"></span>
            <span className="ml-2 opacity-50 text-[11px]">SYS_LOGS_V.2.04</span>
          </div>
          <div className="space-y-1 text-primary-container/80 text-[13px]">
            <p>&gt; Initializing secure environment...</p>
            <p>&gt; Routing through encrypted tunnel [AES-256]</p>
            <p>&gt; Gateway: 192.168.1.1 // Status: CONNECTED</p>
            <p>&gt; Auth: ROOT_ACCESS granted</p>
            <p className="flex items-center gap-1">
              &gt; Monitoring traffic...
              <span className="bg-primary-container w-2 h-4 animate-pulse"></span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Portrait Image (lg:col-span-5) */}
      <div className="lg:col-span-5 relative group w-full">
        <div className="absolute -inset-4 bg-primary-container/10 blur-3xl rounded-full opacity-50"></div>
        <div className="relative glass-panel rounded-2xl overflow-hidden border-primary-container/30 transition-all duration-500 group-hover:border-primary-container group-hover:neon-glow">
          <img
            className="w-full h-[380px] lg:h-[450px] object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
            alt="Sarowar Hosen Portrait"
            src="/photo/sarowar-hosen.jpg"
          />
        </div>
      </div>
    </section>
  );
};

export default IdentityMission;
