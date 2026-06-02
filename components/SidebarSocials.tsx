"use client";

import React from "react";

interface SocialIcon {
  icon: React.ElementType;
  label: string;
}

interface SidebarSocialsProps {
  socialIcons: SocialIcon[];
}

const SidebarSocials: React.FC<SidebarSocialsProps> = ({ socialIcons }) => {
  return (
    <div className="flex justify-between px-2 text-primary-container">
      {socialIcons.map((social, index) => (
        <social.icon key={index} className="text-xl  cursor-pointer transition-colors" title={social.label}/>
      ))}
    </div>
  );
};

export default SidebarSocials;
