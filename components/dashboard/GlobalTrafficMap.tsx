import React from "react";
import Image from "next/image";

const GlobalTrafficMap = () => {
  return (
    <div className="col-span-12 lg:col-span-8 bg-surface-container/50 backdrop-blur-xl border border-outline-variant/30 relative min-h-[500px] overflow-hidden group">
      <div className="absolute inset-0 z-0 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
        <img
          alt="Global Network Map"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp6TEhnKdswQogOqqG17vzQE5EJx_H75ZuEAp0RxWUvUh7XwFD_KbhFeZz9ZIgbdaFlB_qXwAS7AWBg5J3KYHFkIWKsRht7RA5N4Q3phwJIkidYCN6glNKf2zOnt4Nc3vydWjoJ6V8wwFchrnNfCjQlwa1-A8QBbIHocEdJQ2aL7mIfWDAq70aa_9mqcKa6GDRiH9Q8Uhc4-Djmx8MO6EEQGlHFMJYYl5bxSNRHUUoADppKtSam6CT4meOYc47lcML1W-CwYePJ4De"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
      <div className="relative z-10 p-8 flex flex-col h-full">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary mb-1">
              GLOBAL_TRAFFIC_ANALYSIS
            </h2>
            <p className="font-label-mono text-label-mono text-on-surface-variant">
              REAL_TIME_PACKET_ROUTING_V.2
            </p>
          </div>
          <div className="bg-surface-container/80 backdrop-blur-md border border-primary/20 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              <span className="font-label-mono text-[12px]">
                NODE_ALPHA: ACTIVE
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span>
              <span className="font-label-mono text-[12px]">
                NODE_BETA: SYNCED
              </span>
            </div>
          </div>
        </div>
        <div className="mt-auto flex gap-8">
          <div>
            <p className="font-label-caps text-[10px] text-outline">
              INGRESS_TOTAL
            </p>
            <p className="font-label-mono text-headline-md text-primary-fixed-dim">
              45.8 TB/S
            </p>
          </div>
          <div>
            <p className="font-label-caps text-[10px] text-outline">
              EGRESS_TOTAL
            </p>
            <p className="font-label-mono text-headline-md text-secondary-fixed-dim">
              39.2 TB/S
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalTrafficMap;
