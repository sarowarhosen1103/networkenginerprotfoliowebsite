"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user && data.user.role === "root") {
          setAuthorized(true);
        } else {
          setAuthorized(false);
          router.replace("/");
        }
      })
      .catch(() => {
        setAuthorized(false);
        router.replace("/");
      });
  }, [router]);

  if (authorized === null) {
    // Show a high-tech cybersecurity authentication screen matching the theme
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center font-label-mono text-primary-container relative overflow-hidden">
        <div className="absolute -inset-4 bg-primary-container/5 blur-3xl rounded-full opacity-50"></div>
        <div className="flex flex-col items-center gap-4 z-10">
          <div className="w-10 h-10 border-2 border-primary-container border-t-transparent rounded-full animate-spin"></div>
          <div className="text-sm uppercase tracking-widest animate-pulse">&gt; SYS_AUTH: RESOLVING GATEWAY SECURITY...</div>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
