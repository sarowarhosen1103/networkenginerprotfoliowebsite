"use client";

import React from "react";

const SystemLog = () => {
  return (
    <div className="lg:col-span-5 flex flex-col gap-6">
      {/* Terminal Log Box */}
      <div className="glass-surface h-full p-6 flex flex-col font-label-mono text-label-mono border-l-2 border-primary">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-outline-variant/30">
          <span className="text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">dns</span>
            SYSTEM_LOG
          </span>
          <span className="text-outline">Uptime: 14:02:44</span>
        </div>
        
        <div className="flex-grow space-y-3 overflow-hidden text-on-surface-variant/80">
          <p className="text-secondary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#2ae500]"></span>
            NETWORK_STABLE: LATENCY 14ms
          </p>
          <p>&gt; REQUESTING_RSA_PAIRING...</p>
          <p className="text-primary-container terminal-cursor">GENERATING_ENCRYPTION_KEYS</p>
          <p className="pl-4 opacity-60">SHARD_01: 0x442A... COMPLETED</p>
          <p className="pl-4 opacity-60">SHARD_02: 0x981F... COMPLETED</p>
          <p className="pl-4 opacity-60 text-primary-container/70 animate-pulse">SHARD_03: 0xC104... PENDING</p>
          
          <div className="w-full bg-surface-container-high h-1 mt-4">
            <div className="bg-gradient-to-r from-primary-container to-secondary-fixed-dim h-full w-2/3 shadow-[0_0_10px_rgba(0,242,255,0.4)] transition-all duration-1000"></div>
          </div>
          
          <p className="mt-8 text-outline-variant text-[12px] leading-relaxed">
            [NOTICE] This identity profile will be bound to the local hardware fingerprint. Unauthorized migration will trigger a Level 4 Data Purge protocol. Ensure your backup phrase is stored in an air-gapped vault.
          </p>
        </div>

        <div className="mt-auto pt-6">
          <img
            alt="Server hardware"
            className="w-full h-32 object-cover opacity-40 mix-blend-screen grayscale"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcKHXOhqAnfGghbqIiLtP6EYsrYcze8IGnkbQBGaTySpbDTSJiGDF4L9_Xe6fSOUBoS68GbyDEicO04QlUWWfJNxxDiSpul7oGmYQDIFWadXryCS9ENjP67IMvjPKy5HCcFmv8V0Rn-Tbp3fTicZroB0t80jlLT3-OT5d1kk8bKAh9-hUfrJ8QwoCIFhuKTz-sKFR6JE8S9CE_DFwycjuV5qw3b81znuEfogKXRqbkRPH47hvGsEzI-VRIiG4D87Jx_tfUjeMd5oRs"
          />
        </div>
      </div>

      {/* Secondary Status Card */}
      <div className="glass-surface p-4 flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary">
          <span className="material-symbols-outlined text-[32px]">verified_user</span>
        </div>
        <div>
          <div className="font-label-caps text-label-caps text-on-surface">SECURE_HANDSHAKE</div>
          <div className="font-label-mono text-[12px] text-outline uppercase tracking-wider">AES-256-GCM ACTIVE</div>
        </div>
      </div>
    </div>
  );
};

export default SystemLog;
