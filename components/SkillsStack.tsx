"use client";

import React from "react";

const SkillsStack = () => {
  const skills = [
    { label: "CISCO SWITCHING & ROUTING", value: "98%" },
    { label: "PYTHON FOR AUTOMATION", value: "92%" },
    { label: "ANSIBLE PLAYBOOKS", value: "87%" },
    { label: "FORTIGATE SEC OPS", value: "90%" },
    { label: "TRAFROM FOR INFRASTRUCTURE ", value: "87%" },
  ];

  const tags = ["CISCO", "FORTIGATE", "CLOUD", "PYTHON"];

  return (
    <div className="space-y-8">
      <h2 className="text-headline-md font-headline-md mb-8 flex items-center gap-3">
        <span className="material-symbols-outlined text-primary-container">psychology</span>
        SKILL STACK
      </h2>
      <div className="glass-card p-8 space-y-6">
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2 text-label-mono text-[12px]">
                <span className="">{skill.label}</span>
                <span className="text-primary-container">{skill.value}</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary-container" style={{ width: skill.value }}></div>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-white/5">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-white/5 text-[10px] text-on-surface-variant font-label-mono">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsStack;
