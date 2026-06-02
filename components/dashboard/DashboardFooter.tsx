import React from "react";

const DashboardFooter = () => {
  return (
    <footer className="mt-section-gap border-t border-outline-variant/20 bg-surface-container-lowest/80 backdrop-blur-md p-6">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-label-mono text-[12px] text-outline">
          SYSTEM_STATUS: <span className="text-secondary-fixed-dim">OPTIMAL</span> | ENCRYPTION: <span className="text-primary-fixed-dim">AES-256-GCM</span> | LOCATION: <span className="text-on-surface">COLO_4_SGP</span>
        </div>
        <div className="flex gap-8">
          <a className="font-label-mono text-[12px] text-outline hover:text-primary transition-all" href="#">API_DOCS</a>
          <a className="font-label-mono text-[12px] text-outline hover:text-primary transition-all" href="#">SECURITY_PROTOCOL</a>
          <a className="font-label-mono text-[12px] text-outline hover:text-primary transition-all" href="#">VULNERABILITY_DISCLOSURE</a>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
