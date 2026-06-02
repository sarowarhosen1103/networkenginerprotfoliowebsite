"use client";

import React, { useEffect, useState } from "react";
import ChatSidebar from "@/components/chat/ChatSidebar";
import LiveChatWindow from "@/components/dashboard/LiveChatWindow";
import HomepageProfile from "@/components/HomepageProfile";
import { useLayoutContext } from "@/components/Layout/ClientLayout";

export default function ChatPage() {
  const { isSidebarHidden } = useLayoutContext();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isInitializing, setIsInitializing] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const meRes = await fetch("/api/auth/me");
        const meData = await meRes.json();
        
        if (meRes.ok && meData.user) {
          setUser(meData.user);
          if (localStorage.getItem("chat_acknowledged") === "true") {
            setAcknowledged(true);
          }
        }
      } catch (error) {
        console.error("Session check error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const startGuestChat = async () => {
    setIsInitializing(true);
    try {
      if (user) {
        setAcknowledged(true);
        localStorage.setItem("chat_acknowledged", "true");
        return;
      }
      
      const guestRes = await fetch("/api/auth/guest", { method: "POST" });
      const guestData = await guestRes.json();
      
      if (guestRes.ok && guestData.user) {
        setUser(guestData.user);
        setAcknowledged(true);
        localStorage.setItem("chat_acknowledged", "true");
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-20 z-0"></div>
      
      <main 
        className={`relative z-10 pt-20 pb-6 px-margin-mobile md:px-margin-desktop transition-all duration-500 flex flex-col lg:flex-row gap-2 ${
          isSidebarHidden ? "lg:ml-60" : "lg:ml-[360px]"
        }`}
      >
        <HomepageProfile isHidden={isSidebarHidden} />
        
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden rounded-sm border border-white/10 glass-card h-[calc(100vh-140px)]">
          {loading ? (
            <div className="flex-grow flex items-center justify-center bg-surface/30 border-l border-white/10 font-label-mono text-primary-container">
              CHECKING CLEARANCE...
            </div>
          ) : user && acknowledged ? (
            <LiveChatWindow currentUser={user} />
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center bg-surface/30 border-l border-white/10 p-8 text-center">
              <span className="material-symbols-outlined text-[48px] text-primary-container mb-4 opacity-50">lock</span>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-2">ENCRYPTED CHANNEL</h2>
              <p className="font-label-mono text-on-surface-variant mb-8 max-w-md">
                You are about to initiate a secure, anonymous communication uplink with the system administrator. 
                All traffic will be encrypted.
              </p>
              <button 
                onClick={startGuestChat}
                disabled={isInitializing}
                className="px-8 py-4 bg-primary-container text-on-primary-container font-label-caps text-label-caps font-bold tracking-[0.2em] hover:bg-primary hover:text-surface transition-all active:scale-95 shadow-[0_0_20px_rgba(0,242,255,0.2)] disabled:opacity-50"
              >
                {isInitializing ? "GENERATING KEYS..." : "START SECURE CHAT"}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
