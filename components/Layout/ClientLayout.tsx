"use client";

import React, { useState, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import ArchiveSidebar from "@/components/projects/ArchiveSidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

interface LayoutContextProps {
  isSidebarHidden: boolean;
  toggleSidebar: () => void;
}

const LayoutContext = createContext<LayoutContextProps>({
  isSidebarHidden: false,
  toggleSidebar: () => { },
});

export const useLayoutContext = () => useContext(LayoutContext);

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const pathname = usePathname() || "";
  const isDashboard = pathname.startsWith("/dashboard");

  const toggleSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };

  return (
    <LayoutContext.Provider value={{ isSidebarHidden, toggleSidebar }}>
      <div className={isSidebarHidden ? "sidebar-hidden" : ""}>
        <Header onMenuToggle={toggleSidebar} />
        {isDashboard ? (
          <DashboardSidebar isHidden={isSidebarHidden} />
        ) : (
          <ArchiveSidebar isHidden={isSidebarHidden} />
        )}

        {children}

        <style jsx global>{`
          .sidebar-hidden #sidebar {
            transform: translateX(-100%);
          }
          .sidebar-hidden #main-content {
            margin-left: 0;
          }
        `}</style>
      </div>
    </LayoutContext.Provider>
  );
}
