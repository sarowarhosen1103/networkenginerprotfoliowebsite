"use client";

import React from "react";
import { MdTerminal, MdSecurity, MdHub } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="mt-section-gap pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 pb-12">
      <div className="space-y-2">
        <span className="text-label-caps font-label-caps text-primary-container">
          SAROWAR HOSEN
        </span>
        <p className="text-label-mono font-label-mono text-[12px] text-on-surface-variant">
          © 2026 
        </p>
      </div>
      <div className="flex gap-4">
        <div className="h-10 w-10 glass-card flex items-center justify-center text-on-surface-variant hover:text-primary-container cursor-pointer transition-all active:scale-90">
          <MdTerminal className="text-[20px]" />
        </div>
        <div className="h-10 w-10 glass-card flex items-center justify-center text-on-surface-variant hover:text-primary-container cursor-pointer transition-all active:scale-90">
          <MdSecurity className="text-[20px]" />
        </div>
        <div className="h-10 w-10 glass-card flex items-center justify-center text-on-surface-variant hover:text-primary-container cursor-pointer transition-all active:scale-90">
          <MdHub className="text-[20px]" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
