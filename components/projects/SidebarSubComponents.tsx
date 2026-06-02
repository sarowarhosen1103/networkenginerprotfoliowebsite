"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdGridView, MdSecurity, MdTerminal, MdVpnKey, MdPowerSettingsNew } from "react-icons/md";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "grid_view":
      return <MdGridView className="text-lg" />;
    case "security":
      return <MdSecurity className="text-lg" />;
    case "lan":
      return <MdTerminal className="text-lg" />;
    case "vpn_key":
      return <MdVpnKey className="text-lg" />;
    case "power_settings_new":
      return <MdPowerSettingsNew className="text-lg" />;
    default:
      return <MdGridView className="text-lg" />;
  }
};

// --- SIDEBAR USER ---
interface SidebarUserProps {
  name: string;
  status: string;
  avatarUrl: string;
}

export const SidebarUser: React.FC<SidebarUserProps> = ({ name, status, avatarUrl }) => (
  <div className="px-1 py-3 mb-8 flex items-center gap-1 border-[0.05px] border-gray-500/50 rounded">
    {/* <div className="w-6 h-6 rounded bg-surface-variant overflow-hidden border border-primary-container/30">
      {/* <img alt={name} className="w-full h-full object-cover" src={avatarUrl} /> 
    </div> */}
    <div>
      <p className="text-[11px] font-bold text-primary-container uppercase tracking-tight">{name}</p>
      <p className="text-[10px] text-on-surface-variant uppercase">{status}</p>
    </div>
  </div>
);

// --- SIDEBAR NAV LINK ---
interface SidebarNavLinkProps {
  href: string;
  icon: string;
  label: string;
}

export const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({ href, icon, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <Link
      href={href}
      className={`px-3 py-2 flex items-center gap-4 transition-all hover:translate-x-1 duration-200 ${
        isActive 
          ? "bg-primary-container/10 text-primary-container border-l-4 border-primary-container" 
          : "text-on-surface-variant hover:bg-primary-container/5"
      }`}
    >
      {getIcon(icon)}
      <span className="text-[14px] font-label-mono">{label}</span>
    </Link>
  );
};

// --- SIDEBAR FOOTER ---
interface SidebarFooterProps {
  actionLabel: string;
  onAction?: () => void;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ actionLabel, onAction }) => (
  <div className="px-4 mt-auto">
    <button 
      onClick={onAction}
      className="w-full py-3 bg-primary-container text-surface font-label-caps text-[12px] rounded hover:shadow-[0_0_20px_rgba(var(--color-primary-container-rgb),0.4)] transition-all uppercase font-bold"
    >
      {actionLabel}
    </button>
    <a
      className="mt-6 text-on-surface-variant px-4 py-3 hover:bg-primary-container/5 flex items-center gap-4 transition-all cursor-pointer group"
      href="#"
    >
      {getIcon("power_settings_new")}
      <span className="text-label-mono font-label-mono">LOGOUT</span>
    </a>
  </div>
);
