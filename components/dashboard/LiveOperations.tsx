import React from "react";

const LiveOperations = () => {
  return (
    <div className="grid grid-cols-12 gap-gutter">
      <div className="col-span-12 lg:col-span-6 bg-surface-container/50 backdrop-blur-xl border border-outline-variant/30 p-6 flex items-center justify-between">
        <div>
          <h2 className="font-label-caps text-label-caps text-on-surface-variant mb-1">
            LIVE_OPERATIONS
          </h2>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-primary-fixed-dim rounded-full animate-pulse-cyan"></div>
            <span className="font-headline-md text-headline-md text-primary tracking-tighter">
              24_NODES_CONNECTED
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="font-label-mono text-label-mono text-primary-fixed-dim opacity-70">
            UPLINK_STABLE
          </p>
          <p className="font-label-mono text-[10px] text-outline">
            LATENCY: 14MS
          </p>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-6 grid grid-cols-3 gap-4">
        {/* CPU */}
        <div className="bg-surface-container/50 backdrop-blur-xl border border-outline-variant/30 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-label-caps text-[10px] text-on-surface-variant">
              CPU_LOAD
            </span>
            <span className="font-label-mono text-[10px] text-primary">
              42%
            </span>
          </div>
          <div className="h-1 bg-surface-variant w-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-fixed-dim to-primary-container"
              style={{ width: "42%" }}
            ></div>
          </div>
        </div>
        {/* RAM */}
        <div className="bg-surface-container/50 backdrop-blur-xl border border-outline-variant/30 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-label-caps text-[10px] text-on-surface-variant">
              RAM_USED
            </span>
            <span className="font-label-mono text-[10px] text-secondary-fixed-dim">
              68%
            </span>
          </div>
          <div className="h-1 bg-surface-variant w-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-secondary-fixed-dim to-secondary-container"
              style={{ width: "68%" }}
            ></div>
          </div>
        </div>
        {/* Network */}
        <div className="bg-surface-container/50 backdrop-blur-xl border border-outline-variant/30 p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-label-caps text-[10px] text-on-surface-variant">
              BW_IO
            </span>
            <span className="font-label-mono text-[10px] text-primary-fixed-dim">
              1.2GB/S
            </span>
          </div>
          <div className="h-1 bg-surface-variant w-full overflow-hidden">
            <div
              className="h-full bg-primary-fixed-dim"
              style={{ width: "85%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveOperations;
