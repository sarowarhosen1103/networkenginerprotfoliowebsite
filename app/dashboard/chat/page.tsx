"use client";

import React, { useEffect, useState } from "react";
import RootChatPanel from "@/components/dashboard/RootChatPanel";
import { useLayoutContext } from "@/components/Layout/ClientLayout";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

export default function DashboardChatPage() {
  const { isSidebarHidden } = useLayoutContext();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          window.location.href = "/login";
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main
        className={`pt-24 pb-12 px-margin-mobile md:px-margin-desktop transition-all duration-500 flex flex-col gap-8 min-h-screen relative z-10 ${
          isSidebarHidden ? "lg:ml-60" : "lg:ml-[360px]"
        }`}
      >
        <div className="flex items-center justify-center min-h-[500px] text-primary-container font-label-mono">
          VERIFYING ROOT CLEARANCE...
        </div>
      </main>
    );
  }

  if (!user || user.role !== "root") {
    return (
      <main
        className={`pt-24 pb-12 px-margin-mobile md:px-margin-desktop transition-all duration-500 flex flex-col gap-8 min-h-screen relative z-10 ${
          isSidebarHidden ? "lg:ml-60" : "lg:ml-[360px]"
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-[500px] text-error font-label-mono gap-4">
          <span className="material-symbols-outlined text-[48px]">warning</span>
          <h2 className="text-xl">ACCESS DENIED</h2>
          <p className="text-sm text-on-surface-variant max-w-md text-center">
            Your current session has {user?.role || 'no'} privileges. You must log out and log back in to refresh your clearance level to root.
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      <main
        className={`pt-24 pb-12 px-margin-mobile md:px-margin-desktop transition-all duration-500 flex flex-col gap-8 min-h-[calc(100vh-100px)] relative z-10 ${
          isSidebarHidden ? "lg:ml-60" : "lg:ml-[360px]"
        }`}
      >
        <div className="p-gutter max-w-container-max mx-auto space-y-gutter w-full flex-grow flex flex-col">
          <RootChatPanel currentUser={user} />
        </div>

        <DashboardFooter />
      </main>
    </>
  );
}
