"use client";

import React, { useEffect, useState } from "react";
import LiveOperations from "@/components/dashboard/LiveOperations";
import GlobalTrafficMap from "@/components/dashboard/GlobalTrafficMap";
import VisitorMetrics from "@/components/dashboard/VisitorMetrics";
import ProjectOverview from "@/components/dashboard/ProjectOverview";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import RootChatPanel from "@/components/dashboard/RootChatPanel";
import { useLayoutContext } from "@/components/Layout/ClientLayout";

export default function DashboardPage() {
  const { isSidebarHidden } = useLayoutContext();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      });
  }, []);

  return (
    <>
      <main
        className={`pt-24 pb-12 px-margin-mobile md:px-margin-desktop transition-all duration-500 flex flex-col gap-8 min-h-screen relative z-10 ${
          isSidebarHidden ? "lg:ml-60" : "lg:ml-[360px]"
        }`}
      >
        <div className="p-gutter max-w-container-max mx-auto space-y-gutter w-full">
          {/* Section 4 & 5: LIVE_OPERATIONS & SYSTEM_RESOURCE_MONITOR */}
          <LiveOperations />

          {/* Section 2 & 3: GLOBAL_TRAFFIC_ANALYSIS & VISITOR_METRICS_ENGINE */}
          <div className="grid grid-cols-12 gap-gutter">
            <GlobalTrafficMap />
            <VisitorMetrics />
          </div>

          {/* Section 1: PROJECT_OVERVIEW */}
          <ProjectOverview />
        </div>

        {/* Footer Terminal Readout */}
        <DashboardFooter />
      </main>

      {/* FAB Overlay */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-14 h-14 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.4)] hover:scale-110 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-[32px]">bolt</span>
        </button>
      </div>
    </>
  );
}
