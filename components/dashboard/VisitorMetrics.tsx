import React from "react";

const VisitorMetrics = () => {
  return (
    <div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">
      <div className="flex-1 bg-surface-container/50 backdrop-blur-xl border border-outline-variant/30 p-6">
        <h2 className="font-label-caps text-label-caps text-on-surface-variant mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-fixed-dim">
            analytics
          </span>
          VISITOR_METRICS_ENGINE
        </h2>
        <div className="space-y-6">
          {/* Today */}
          <div>
            <div className="flex justify-between items-end">
              <p className="font-label-mono text-[12px] text-outline">TODAY</p>
              <p className="font-label-mono text-[10px] text-secondary-fixed-dim">
                +12.4%
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-headline-lg text-headline-lg text-primary tracking-tighter">
                1,402
              </span>
              <div className="w-24 h-8 flex items-end gap-1">
                <div className="bg-primary/20 w-full h-[40%]"></div>
                <div className="bg-primary/20 w-full h-[60%]"></div>
                <div className="bg-primary/20 w-full h-[30%]"></div>
                <div className="bg-primary-container w-full h-[90%]"></div>
              </div>
            </div>
          </div>
          {/* Week */}
          <div>
            <div className="flex justify-between items-end">
              <p className="font-label-mono text-[12px] text-outline">WEEK</p>
              <p className="font-label-mono text-[10px] text-secondary-fixed-dim">
                +5.8%
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-headline-lg text-headline-lg text-primary tracking-tighter">
                12.8K
              </span>
              <div className="w-24 h-8 flex items-end gap-1">
                <div className="bg-primary/20 w-full h-[50%]"></div>
                <div className="bg-primary/20 w-full h-[70%]"></div>
                <div className="bg-primary-container w-full h-[45%]"></div>
                <div className="bg-primary/20 w-full h-[30%]"></div>
              </div>
            </div>
          </div>
          {/* Month */}
          <div>
            <div className="flex justify-between items-end">
              <p className="font-label-mono text-[12px] text-outline">MONTH</p>
              <p className="font-label-mono text-[10px] text-error">-1.2%</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-headline-lg text-headline-lg text-primary tracking-tighter">
                48.2K
              </span>
              <div className="w-24 h-8 flex items-end gap-1">
                <div className="bg-primary-container w-full h-[80%]"></div>
                <div className="bg-primary/20 w-full h-[60%]"></div>
                <div className="bg-primary/20 w-full h-[40%]"></div>
                <div className="bg-error/30 w-full h-[20%]"></div>
              </div>
            </div>
          </div>
          {/* Year */}
          <div>
            <p className="font-label-mono text-[12px] text-outline">YEAR</p>
            <span className="font-headline-lg text-headline-lg text-primary tracking-tighter">
              0.52M
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorMetrics;
