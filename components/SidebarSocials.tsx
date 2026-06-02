"use client";

import Link from "next/link";
import React from "react";

interface SocialIcon {
  icon: React.ElementType;
  label: string;
  weblink: string;
}

interface SidebarSocialsProps {
  socialIcons: SocialIcon[];
}

const SidebarSocials: React.FC<SidebarSocialsProps> = ({ socialIcons }) => {
  return (
    <div className="flex justify-between px-2 text-primary-container">
      {socialIcons.map((social, index) => (
        <Link href={social.weblink} key={index}>
          <social.icon  className="text-xl  cursor-pointer transition-colors" title={social.label}/>
        </Link>
      ))}
    </div>
  );
};

export default SidebarSocials;
