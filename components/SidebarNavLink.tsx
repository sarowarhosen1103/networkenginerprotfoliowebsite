"use client";

import React from "react";

interface SidebarNavLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
}

const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({
  href,
  icon: Icon,
  label,
  isActive = false,
}) => {
  const activeClasses = "bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(0,242,255,0.3)] border-l-4 border-primary-container";
  const inactiveClasses = "text-on-surface-variant hover:bg-white/5 group";

  return (
    <a href={href} className={`flex items-center gap-3 px-2 py-1.5 rounded-lg transition-all duration-200 ${ isActive ? activeClasses : inactiveClasses}`}>
      <Icon className={`text-sm transition-colors ${ isActive ? "text-on-primary-container" : "group-hover:text-primary-container"}`} />
      <span className="text-label-caps font-label-caps">{label}</span>
    </a>
  );
};

export default SidebarNavLink;
