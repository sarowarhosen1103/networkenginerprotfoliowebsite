"use client";

import React from "react";
import { SidebarUser, SidebarNavLink, SidebarFooter } from "./SidebarSubComponents";

interface ArchiveSidebarProps {
  isHidden: boolean;
}

const ArchiveSidebar: React.FC<ArchiveSidebarProps> = ({ isHidden }) => {
  const navItems = [
    { href: "/", icon: "grid_view", label: "HOME" },
    { href: "/archives", icon: "security", label: "PROJECTS" },
    { href: "/videos", icon: "lan", label: "VIDEO" },
    { href: "/chat", icon: "vpn_key", label: "CHAT" },
  ];

  return (
    <aside className={`bg-surface-container-lowest/80 backdrop-blur-md border-r border-outline-variant fixed left-0 top-0 h-full flex flex-col pt-20 pb-8 z-40 w-34 transition-transform duration-300 ${isHidden ? "-translate-x-full" : "translate-x-0"} hidden lg:flex`}>
      <SidebarUser 
        name="SAROWAR HOSEN" 
        status="Network  Engineer" 
        avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAnT56_j5c14fuoo1THtrM-RYFGqpom_7LDDuWwuX1EXuFYwlkhCz3cAzQn6tVxFc5KiO9nDhKJwgn8yYQ7cQHm73Rim4J-_gRYYoa6rgfLSGujlOGz6LMc0KjdSdMjSPdmigPisHrlUJDZ6mdiR---lvl2ct4DsWnvTE92AbOtLDuCPSIAE9W77n5p0KA6ReAEvLDJWnuQJf2SG6Q46utX7oQ39nNpQyR0by71A3kbldWWXvN2dUbe4UIQ3jq_RWuF3wSfNEvH7Ald"
      />
      
      <nav className="flex-1">
        {navItems.map((item) => (
          <SidebarNavLink key={item.href} {...item} />
        ))}
      </nav>
      
    </aside>
  );
};

export default ArchiveSidebar;
