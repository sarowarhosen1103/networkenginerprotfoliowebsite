"use client";

import React from "react";

interface Channel {
  id: string;
  status: "LIVE" | "STBY";
  encryption: string;
  active: boolean;
}

const ChatSidebar = () => {
  const channels: Channel[] = [
    { id: "CID_0492_X", status: "LIVE", encryption: "AES_256_ACTIVE", active: true },
    { id: "CID_8812_Q", status: "STBY", encryption: "SESSION_SUSPENDED", active: false },
    { id: "EXT_PROXY_01", status: "LIVE", encryption: "TLS_1.3_STABLE", active: false },
  ];

  return (
    <aside className="w-full md:w-70 flex-shrink-0 bg-surface-container-lowest/50 border-r border-white/5 flex flex-col">
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-label-caps font-label-caps text-primary-container">MASSENGER</h2>
        </div>
        <div className="relative">
          <input
            className="w-full bg-surface-container text-label-mono font-label-mono text-sm border border-white/10 rounded px-4 py-2 focus:outline-none focus:border-primary-container/50 placeholder:opacity-30"
            placeholder="FILTER_NODES..."
            type="text"
          />
        </div>
      </div>
      <div className="overflow-y-auto flex-grow p-4 flex flex-col gap-2 custom-scrollbar">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className={`p-2 rounded-lg cursor-pointer transition-all border ${
              channel.active
                ? "bg-primary-container/5 border-primary-container/30"
                : "hover:bg-white/5 border-transparent"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-label-mono font-label-mono ${channel.active ? "text-primary-container" : "text-on-surface"}`}>
                {channel.id}
              </span>
              <div className="flex items-center gap-1">
                <div className={`w-1.5 h-1.5 rounded-full ${channel.status === "LIVE" ? "bg-secondary-fixed animate-pulse" : "bg-on-surface-variant"}`}></div>
                <span className={`text-[10px] font-label-mono ${channel.status === "LIVE" ? "text-secondary-fixed" : "text-on-surface-variant"}`}>
                  {channel.status}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-label-mono text-on-surface-variant">{channel.encryption}</span>
              <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
                <div 
                  className={`h-full ${channel.status === "LIVE" ? "bg-secondary-fixed-dim" : "bg-on-surface-variant"} transition-all`}
                  style={{ width: channel.status === "LIVE" ? "100%" : "33%" }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default ChatSidebar;
