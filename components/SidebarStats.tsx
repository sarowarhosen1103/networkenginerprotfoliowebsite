"use client";

import React from "react";

interface StatItem {
  label: string;
  value: string;
}

interface SidebarStatsProps {
  uptimeMetric: string;
  stats: StatItem[];
}

const SidebarStats: React.FC<SidebarStatsProps> = ({ uptimeMetric, stats }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1 text-[10px] font-label-mono opacity-70">
              <span>{stat.label}</span>
              <span className="text-primary-container">{stat.value}</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary-container to-secondary-fixed"style={{ width: stat.value }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarStats;
