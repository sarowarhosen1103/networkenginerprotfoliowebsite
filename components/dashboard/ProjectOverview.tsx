import React from "react";
import Link from "next/link";

const ProjectOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-headline-md text-headline-md text-primary uppercase">
            PROJECT_OVERVIEW
          </h2>
          <p className="font-label-mono text-label-mono text-on-surface-variant">
            ACTIVE_INITIATIVES_STATUS_LIST
          </p>
        </div>
        <Link
          href="/archives"
          className="font-label-mono text-label-mono text-primary-fixed-dim hover:text-primary transition-colors flex items-center gap-2"
        >
          VIEW_ARCHIVE{" "}
          <span className="material-symbols-outlined">chevron_right</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {/* Project Card 1 */}
        <div className="bg-surface-container/50 backdrop-blur-xl border border-outline-variant/30 p-6 hover:border-primary-container transition-all group">
          <div className="flex justify-between items-start mb-8">
            <span className="font-label-mono text-[10px] text-outline">
              ID: VLAN-992-PX
            </span>
            <span className="px-2 py-0.5 bg-secondary/10 border border-secondary text-secondary-fixed-dim font-label-mono text-[10px]">
              DEPLOYED
            </span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-4">
            Multi-VLAN Provisioning
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-6">
            Automated isolation logic for multi-tenant data center architecture.
          </p>
          <a
            className="font-label-mono text-label-mono text-primary-fixed-dim flex items-center gap-2 group-hover:gap-4 transition-all"
            href="#"
          >
            SEE_SPECS{" "}
            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </a>
        </div>
        {/* Project Card 2 */}
        <div className="bg-surface-container/50 backdrop-blur-xl border border-outline-variant/30 p-6 hover:border-primary-container transition-all group">
          <div className="flex justify-between items-start mb-8">
            <span className="font-label-mono text-[10px] text-outline">
              ID: ZT-FORCE-01
            </span>
            <span className="px-2 py-0.5 bg-primary-container/10 border border-primary-container text-primary-fixed-dim font-label-mono text-[10px]">
              ACTIVE
            </span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-4">
            Zero-Trust Framework
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-6">
            Identity-based perimeter enforcement for hybrid cloud infrastructures.
          </p>
          <a
            className="font-label-mono text-label-mono text-primary-fixed-dim flex items-center gap-2 group-hover:gap-4 transition-all"
            href="#"
          >
            SEE_SPECS{" "}
            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </a>
        </div>
        {/* Project Card 3 */}
        <div className="bg-surface-container/50 backdrop-blur-xl border border-outline-variant/30 p-6 hover:border-primary-container transition-all group">
          <div className="flex justify-between items-start mb-8">
            <span className="font-label-mono text-[10px] text-outline">
              ID: EDGE-OPT-V4
            </span>
            <span className="px-2 py-0.5 bg-outline-variant/20 border border-outline text-outline font-label-mono text-[10px]">
              PENDING
            </span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-4">
            Edge Optimization
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-6">
            Caching layers for low-latency delivery in remote regions.
          </p>
          <a
            className="font-label-mono text-label-mono text-primary-fixed-dim flex items-center gap-2 group-hover:gap-4 transition-all"
            href="#"
          >
            SEE_SPECS{" "}
            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </a>
        </div>
        {/* Project Card 4 */}
        <div className="bg-surface-container/50 backdrop-blur-xl border border-outline-variant/30 p-6 hover:border-primary-container transition-all group">
          <div className="flex justify-between items-start mb-8">
            <span className="font-label-mono text-[10px] text-outline">
              ID: CRYPT-WAL-82
            </span>
            <span className="px-2 py-0.5 bg-secondary/10 border border-secondary text-secondary-fixed-dim font-label-mono text-[10px]">
              DEPLOYED
            </span>
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-4">
            Neural Firewall
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-6">
            AI-driven anomaly detection for rapid threat neutralisation.
          </p>
          <a
            className="font-label-mono text-label-mono text-primary-fixed-dim flex items-center gap-2 group-hover:gap-4 transition-all"
            href="#"
          >
            SEE_SPECS{" "}
            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
