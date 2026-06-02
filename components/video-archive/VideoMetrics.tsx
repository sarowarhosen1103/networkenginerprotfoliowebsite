"use client";

import React from "react";

interface VideoMetricsProps {
  totalRecords: string;
  storageUsage: string;
  storagePercent: number;
  bandwidthUsage: string;
  bandwidthPercent: number;
  uptime: string;
  latency: string;
  activeStreams: number;
}

const VideoMetrics: React.FC<VideoMetricsProps> = ({
  totalRecords,
  storageUsage,
  storagePercent,
  bandwidthUsage,
  bandwidthPercent,
  uptime,
  latency,
  activeStreams,
}) => {
  return (
    <aside className="lg:col-span-1 space-y-6">
      <div className="bg-surface-container-high/50 backdrop-blur-xl border border-white/10 p-6 sticky top-24">
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-primary-container">database</span>
          <h2 className="font-label-caps text-label-caps text-on-surface">STORAGE_METRICS</h2>
        </div>
        
        <div className="space-y-8">
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-label-mono text-label-mono text-on-surface-variant">TOTAL_RECORDS</span>
              <span className="font-label-mono text-label-mono text-primary-container">{totalRecords}</span>
            </div>
            <div className="h-1 bg-surface-container-highest">
              <div 
                className="h-full bg-primary-container shadow-[0_0_10px_rgba(0,242,255,0.5)] transition-all duration-1000" 
                style={{ width: `${storagePercent}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="font-label-mono text-label-mono text-on-surface-variant">BANDWIDTH_USAGE</span>
              <span className="font-label-mono text-label-mono text-primary-container">{bandwidthUsage}</span>
            </div>
            <div className="h-1 bg-surface-container-highest">
              <div 
                className="h-full bg-secondary-container transition-all duration-1000" 
                style={{ width: `${bandwidthPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-4 border-t border-white/10">
            <div>
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">SYSTEM_UPTIME</p>
              <p className="font-label-mono text-label-mono text-secondary-container">{uptime}</p>
            </div>
            <div>
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">LATENCY_P99</p>
              <p className="font-label-mono text-label-mono text-primary-container">{latency}</p>
            </div>
            <div>
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">ACTIVE_STREAMS</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-secondary-container rounded-full animate-pulse"></span>
                <p className="font-label-mono text-label-mono text-secondary-container">{activeStreams} LIVE_USER_NODES</p>
              </div>
            </div>
          </div>

          <button className="w-full mt-6 py-4 border border-primary-container text-primary-container font-label-caps text-label-caps hover:bg-primary-container/10 transition-colors uppercase flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">refresh</span>
            SYNC_DATA_NODES
          </button>
        </div>
      </div>

      {/* SYSTEM STATUS CHIP */}
      <div className="bg-surface-container-lowest border border-secondary-container/30 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary-container text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified_user
          </span>
          <span className="font-label-caps text-label-caps text-on-surface">SECURE_ENVIRONMENT</span>
        </div>
        <span className="font-label-mono text-label-mono text-secondary-container text-[10px]">V.1.0.9_STABLE</span>
      </div>
    </aside>
  );
};

export default VideoMetrics;
