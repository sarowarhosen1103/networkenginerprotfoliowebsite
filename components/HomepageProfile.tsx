"use client";

import React from "react";
import { MdPublic, MdCode, MdEmail, MdRssFeed, MdKeyboardDoubleArrowDown } from 'react-icons/md';
import SidebarStats from "./SidebarStats";
import SidebarSocials from "./SidebarSocials";
import Image from 'next/image'


interface SidebarProps {
  isHidden?: boolean;
  toggleSidebar?: () => void;
}

const HomepageProfile: React.FC<SidebarProps> = ({ isHidden, toggleSidebar }) => {
  const socialIcons = [
    { icon: MdPublic, label: "Public" },
    { icon: MdCode, label: "Code" },
    { icon: MdEmail, label: "Email" },
    { icon: MdRssFeed, label: "Feed" },
  ];

  const technicalStats = [
    { label: "Cisco Switching & Routing", value: "94%" },
    { label: "IP Networking", value: "92%" },
    { label: "TCP/IP", value: "92%" },
    { label: "Subnetting & VLANs", value: "90%" },
    { label: "Routing Protocols (OSPF, EIGRP, BGP)", value: "90%" },
    { label: "STP, EtherChannel", value: "88%" },
    { label: "WAN Technologies", value: "85%" },
    { label: "Wireless Networking", value: "84%" },
    { label: "Firewall Management", value: "88%" },
    { label: "FortiGate Firewall", value: "90%" },
    { label: "Cisco ASA Firewall", value: "85%" },
    { label: "VPN Configuration", value: "88%" },
    { label: "Network Security", value: "89%" },
    { label: "Cisco ESA (Email Security / Antispam)", value: "88%" },
    { label: "Access Control & ACLs", value: "86%" },
    { label: "F5 Load Balancer", value: "88%" },
    { label: "DNS, DHCP, NAT", value: "90%" },
    { label: "Network Services", value: "88%" },
    { label: "High Availability & Redundancy", value: "84%" },
    { label: "Data Center Networking", value: "85%" },
    { label: "Cloud Networking", value: "88%" },
    { label: "AWS Networking", value: "84%" },
    { label: "Azure Networking", value: "80%" },
    { label: "Network Automation", value: "86%" },
    { label: "Python for Networking", value: "85%" },
    { label: "Ansible Automation", value: "87%" },
    { label: "Infrastructure as Code (IaC)", value: "78%" },
    { label: "Wireshark Packet Analysis", value: "87%" },
    { label: "Network Troubleshooting", value: "92%" },
    { label: "Monitoring Tools (PRTG, Zabbix, SolarWinds)", value: "82%" },
    { label: "Linux Administration", value: "84%" },
  ];

  return (
    <aside
      className={`fixed  h-[84%] z-50 flex flex-col pt-4  px-4 w-62 bg-surface-container-lowest/80 backdrop-blur-md border-r border-white/10 shadow-2xl  shadow-primary-container/5 overflow-y-auto  transition-transform duration-300 rounded-md ${isHidden ? 'left-4 top-20' : "left-36 top-20"} `}
      id="sidebar-profile"
    >
      {/* 1. TOP SECTION (20%) - Identity */}
      <div className="h-[27%] flex flex-col items-center justify-center text-center border-b border-white/5 py-4 shrink-0">
        <div className="relative group">
          <div className="absolute -inset-1 bg-primary-container rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative h-25 w-25 rounded-full border-2 border-primary-container p-1 bg-surface-container overflow-hidden">
            {/* <img
              alt="Sarowar Hosen Profile"
              className="h-full w-full object-cover rounded-full"
              // src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnT56_j5c14fuoo1THtrM-RYFGqpom_7LDDuWwuX1EXuFYwlkhCz3cAzQn6tVxFc5KiO9nDhKJwgn8yYQ7cQHm73Rim4J-_gRYYoa6rgfLSGujlOGz6LMc0KjdSdMjSPdmigPisHrlUJDZ6mdiR---lvl2ct4DsWnvTE92AbOtLDuCPSIAE9W77n5p0KA6ReAEvLDJWnuQJf2SG6Q46utX7oQ39nNpQyR0by71A3kbldWWXvN2dUbe4UIQ3jq_RWuF3wSfNEvH7Ald"
            /> */}
            <Image src={'/photo/sarowar-hosen.jpg'} alt="sarowar hosen" width={100} height={100} className="h-full w-full object-cover rounded-full self-center" />
          </div>
          <div className="absolute bottom-0 right-0 h-3 w-3 bg-secondary-fixed rounded-full border-2 border-surface animate-pulse"></div>
        </div>
        <h2 className="mt-2 text-[20px] font-headline-md text-primary-container leading-none">
          SAROWAR HOSEN
        </h2>
        <p className="text-[15px] font-label-mono text-secondary-fixed tracking-[0.15em] mt-1 uppercase opacity-80">
          NETWORK  ENGINEER
        </p>
      </div>

      <section>
        <div className="flex flex-col gap-1 text-sm py-2 text-[12px]">
          <div className=" flex justify-between px-2 ">
            <p className=" opacity-50">Residence :</p>
            <p className={`opacity-50`}>Bangladeshi</p>
          </div>
          <div className="flex justify-between px-2">
            <p className=" opacity-50">City :</p>
            <p className={`opacity-50`}>Noakhali</p>
          </div>
          <div className="flex justify-between px-2">
            <p className=" opacity-50">Age :</p>
            <p className={`opacity-50`}>21</p>
          </div>
        </div>
      </section>

      {/* 2. MIDDLE SECTION (70%) - Skills with Internal Scroll */}
      <div className="h-[71%] relative group/scroll flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto profile-custom-scrollbar py-6 px-2">
          <SidebarStats uptimeMetric="99.99%" stats={technicalStats} />
        </div>

        {/* Scroll Indicator Arrow */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-300 group-hover/scroll:opacity-0">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-8 h-8 bg-primary-container/20 rounded-full animate-ping"></div>
            <MdKeyboardDoubleArrowDown className="text-primary-container animate-bounce text-[20px]" />
          </div>
        </div>
      </div>

      {/* 3. END SECTION (10%) - Social Links */}
      <div className="h-[9%] border-t border-white/5 shrink-0 bg-surface-container-lowest/50 py-4">
        <SidebarSocials socialIcons={socialIcons} />
      </div>
    </aside>
  );
};

export default HomepageProfile;
