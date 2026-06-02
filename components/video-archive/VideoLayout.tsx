"use client";

import React from "react";

export const VideoHeader = () => (
  <header className="bg-surface-dim/70 backdrop-blur-md text-primary-container flex justify-between items-center w-full px-margin-desktop h-16 sticky top-0 z-50 border-b border-white/10">
    <div className="font-headline-md text-headline-md text-primary-container tracking-tighter uppercase">
      SAROWAR HOSEN
    </div>
    <div className="hidden md:flex items-center gap-8">
      <nav className="flex gap-6">
        <a className="text-on-surface-variant font-medium hover:text-primary-container transition-colors duration-300" href="/">PROTOCOLS</a>
        <a className="text-primary-container font-bold border-b-2 border-primary-container" href="#">ARCHIVE</a>
        <a className="text-on-surface-variant font-medium hover:text-primary-container transition-colors duration-300" href="#">SYSTEM_LOGS</a>
      </nav>
      <div className="flex items-center gap-4 border-l border-white/10 pl-6">
        <span className="material-symbols-outlined text-primary-container">terminal</span>
        <span className="material-symbols-outlined text-primary-container">settings_input_component</span>
        <div className="relative">
          <span className="material-symbols-outlined text-primary-container">notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-secondary-container rounded-full animate-pulse"></span>
        </div>
      </div>
    </div>
  </header>
);

export const VideoSidebar = () => (
  <aside className="fixed left-0 top-0 h-screen flex flex-col pt-20 pb-8 z-40 bg-surface-container-lowest/70 backdrop-blur-xl text-primary-container w-64 border-r border-white/10 hidden md:flex">
    <div className="px-6 mb-10">
      <div className="font-headline-md text-headline-md text-primary-container">OPS_CORE_V1</div>
      <div className="font-label-mono text-label-mono text-secondary-container flex items-center gap-2">
        <span className="w-2 h-2 bg-secondary-container rounded-full animate-pulse"></span>
        STATUS_ENCRYPTED
      </div>
    </div>
    <nav className="flex-1 flex flex-col gap-1">
      {[
        { icon: "dashboard", label: "Dashboard" },
        { icon: "dynamic_form", label: "Traffic" },
        { icon: "security", label: "Threats" },
        { icon: "lock", label: "Encryption", active: true },
        { icon: "analytics", label: "Sys Stats" },
      ].map((item) => (
        <a
          key={item.label}
          className={`flex items-center gap-4 px-6 py-4 transition-all group ${
            item.active 
              ? "bg-primary-container/10 text-primary-container border-r-4 border-primary-container shadow-[0_0_15px_rgba(0,242,255,0.3)] translate-x-1" 
              : "text-on-surface-variant hover:bg-white/5"
          }`}
          href="#"
        >
          <span className="material-symbols-outlined">{item.icon}</span>
          <span className="font-label-caps text-label-caps">{item.label}</span>
        </a>
      ))}
    </nav>
    <div className="px-6 pt-4 border-t border-white/10">
      <button className="w-full py-3 bg-error-container text-on-error-container font-label-caps text-label-caps flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
        <span className="material-symbols-outlined text-sm">terminal</span>
        TERMINATE_SESSION
      </button>
    </div>
  </aside>
);

export const VideoFooter = () => (
  <footer className="bg-surface-dim/80 backdrop-blur-md text-primary-container border-t border-white/10 flex flex-col md:flex-row justify-between items-center px-margin-desktop py-8 w-full gap-4 relative z-50">
    <div className="font-label-caps text-label-caps text-on-surface-variant">
      © 2024 SAROWAR_HOSEN_OS // ENCRYPTED_PROTOCOL
    </div>
    <div className="flex gap-8">
      <a className="font-label-mono text-label-mono text-on-surface-variant opacity-60 hover:opacity-100 hover:text-primary-container transition-opacity" href="#">PROTOCOLS</a>
      <a className="font-label-mono text-label-mono text-on-surface-variant opacity-60 hover:opacity-100 hover:text-primary-container transition-opacity" href="#">AUTHENTICATION</a>
      <a className="font-label-mono text-label-mono text-on-surface-variant opacity-60 hover:opacity-100 hover:text-primary-container transition-opacity" href="#">SYSTEM_LOGS</a>
    </div>
    <div className="font-label-mono text-label-mono text-secondary-container">
      AES_256_ACTIVE_CONNECTION
    </div>
  </footer>
);
