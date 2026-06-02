"use client";

import React from "react";

const Timeline = () => {
  const experiences = [
    {
      period: "2022 - PRESENT",
      title: "Network and Infrastructure Automation",
      company: "GLOBAL_TECH_SYSTEMS",
      desc: "Automated network infrastructure using Ansible, Python, and Terraform IaC.",
      current: true,
    },
    {
      period: "2019 - 2022",
      title: "Network Security Specialist",
      company: "CYBER_DEFENSE_CORP",
      desc: "Implemented enterprise-wide Fortigate and Palo Alto firewall clusters and orchestrated automated incident response.",
      current: true,
    },
    {
      period: "2016 - 2019",
      title: "Network Support Engineer",
      company: "CONNECT_FAST_ISP",
      desc: "Managed large-scale Network Infrastructure, specializing in Cisco BGP routing and OSPF optimization. and also doing Juniper/Mikrotik Configuration and troubleshooting.",
      current: true,
    },
  ];

  return (
    <div className="lg:col-span-2" id="experience">
      <h2 className="text-headline-md font-headline-md mb-8 flex items-center gap-3">
        <span className="material-symbols-outlined text-primary-container">history</span>
        MAIN ROLE 
      </h2>
      <div className="relative pl-8 space-y-12 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-[2px] before:bg-white/10">
        {experiences.map((exp, index) => (
          <div key={index} className="relative">
            <div className={`absolute left-[-30px] top-1 h-[22px] w-[22px] rounded-full bg-surface border-4  ${ exp.current ? "border-primary-container shadow-[0_0_10px_rgba(0,242,255,0.5)]" : "border-white/20"}`}></div>
            <span className={`text-label-mono text-[20px] ${ exp.current ? "text-primary-container" : "text-on-surface-variant"}`}>
              {exp.title}
            </span>
            <p className="text-body-md text-on-surface-variant">{exp.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
