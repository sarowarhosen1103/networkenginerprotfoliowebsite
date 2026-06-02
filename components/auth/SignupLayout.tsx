"use client";

import React from "react";

export const SignupHeader = () => (
  <header className="fixed top-0 left-0 w-full z-50 bg-surface/70 backdrop-blur-md border-b border-outline-variant/30 h-16 flex items-center">
    <div className="w-full px-margin-desktop max-w-container-max mx-auto flex justify-between items-center">
      <div className="flex items-center gap-4">
        <span className="font-headline-md text-headline-md font-bold text-primary drop-shadow-[0_0_10px_rgba(0,219,231,0.5)]">
          NETSEC_OS // TERMINAL v1.0.4
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8 font-label-mono text-label-mono uppercase tracking-widest">
        <a className="text-on-surface-variant hover:text-primary-container transition-colors duration-200" href="/">Status</a>
        <a className="text-on-surface-variant hover:text-primary-container transition-colors duration-200" href="/archives">Metrics</a>
        <a className="text-on-surface-variant hover:text-primary-container transition-colors duration-200" href="/videos">Logs</a>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">terminal</span>
        </button>
        <div className="w-8 h-8 rounded-full border border-primary/30 overflow-hidden">
          <img 
            alt="User profile" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0R0NdH7G8ut7_bXk54-quPLTsucl_P-ofEQKoia37uvXzJrpe0wXPfxmCK5E1ycGyHwvbH-FuTsXKl29yxwcg1IaJiFg3_WnVZWyi_8sgWSPw0muZE_3Jm8cF9Y3StNZONDlk1XyYoWabQ9-5iXN4IIOMrOEZxcToO7xx5DjRMKJSNqHslPAtq1-GZcyG6iesuoMgsEJatdXNbpZcKtJVbLkTcueDho8Kbk7ICxO27OeSwSYShWP8dk4O9pwGwGKa0uE1gAKOZUM4"
          />
        </div>
      </div>
    </div>
  </header>
);

export const SignupFooter = () => (
  <footer className="w-full py-8 px-margin-desktop border-t border-outline-variant/10 opacity-60">
  </footer>
);
