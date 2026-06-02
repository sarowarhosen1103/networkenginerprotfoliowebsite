"use client";

import React from "react";

const Competencies = () => {
  const skills = [
    {
      icon: "lan",
      title: "Networking",
      desc: "Enterprise Cisco/Juniper/Mikrotik routing & switching Networking.",
    },
    {
      icon: "shield_lock",
      title: "Cyber Security",
      desc: "Fortigate, PaloAlto Firewall management, and zero-trust implementation.",
    },
    {
      icon: "terminal",
      title: "Linux Systems",
      desc: "Hardened kernel config, bash scripting, and server admin.",
    },
    {
      icon: "cloud",
      title: "Cloud Infra",
      desc: "AWS/Azure/GCP Cloud Networking.",
    },
    {
      icon: "bolt",
      title: "Automation",
      desc: "Ansible, Python, and Terraform IaC.",
    },
  ];

  return (
    <section>
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-headline-lg font-headline-lg uppercase">
            Core Skills
          </h2>
          <div className="h-1 w-24 bg-primary-container mt-2"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-1">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="glass-card p-6 flex flex-col items-center text-center gap-4 group"
          >
            <div className="h-16 w-16 flex items-center justify-center bg-primary-container/10 border border-primary-container/20 rounded-xl group-hover:bg-primary-container/20 transition-colors">
              <span className="material-symbols-outlined text-primary-container text-4xl">
                {skill.icon}
              </span>
            </div>
            <h4 className="font-label-caps text-label-caps">{skill.title}</h4>
            <p className="text-[11px] text-on-surface-variant font-label-mono">
              {skill.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Competencies;
