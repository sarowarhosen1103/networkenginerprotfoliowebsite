"use client";

import React from "react";
import Link from "next/link";
import { 
  MdDashboard, 
  MdForum, 
  MdFolderSpecial, 
  MdList, 
  MdAdd, 
  MdVideoLibrary, 
  MdVideoCall, 
  MdCategory, 
  MdHub, 
  MdStorage, 
  MdSettings, 
  MdLogout 
} from "react-icons/md";

interface DashboardSidebarProps {
  isHidden: boolean;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isHidden }) => {
  return (
    <aside
      className={`flex flex-col fixed left-0 top-0 z-40 h-screen w-64 border-r border-outline-variant/30 bg-surface/70 backdrop-blur-xl shadow-[0_0_15px_rgba(0,242,255,0.1)] transition-transform duration-300 ${
        isHidden ? "-translate-x-full" : "translate-x-0"
      } hidden lg:flex`}
    >
      <div className="p-8">
        <h1 className="font-headline-md text-headline-md text-primary tracking-tighter uppercase">
          CYBER_SHIELD
        </h1>
        <p className="font-label-mono text-label-mono text-on-surface-variant opacity-60">
          V.4.02-STABLE
        </p>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 p-3 transition-all duration-300 ease-in-out active:scale-95 text-primary-fixed-dim border-l-2 border-primary-fixed-dim bg-primary/10 shadow-[inset_4px_0_10px_rgba(0,219,231,0.2)]"
        >
          <MdDashboard className="text-xl" />
          <span className="font-label-mono text-label-mono">Dashboard</span>
        </Link>
        <Link
          href="/dashboard/chat"
          className="flex items-center gap-3 p-3 transition-all duration-300 ease-in-out active:scale-95 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50"
        >
          <MdForum className="text-xl" />
          <span className="font-label-mono text-label-mono">Communications</span>
        </Link>
        {/* Projects Menu */}
        <div className="flex flex-col group">
          <Link
            href="/dashboard/projects"
            className="flex items-center gap-3 p-3 transition-all duration-300 ease-in-out active:scale-95 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50"
          >
            <MdFolderSpecial className="text-xl" />
            <span className="font-label-mono text-label-mono flex-grow">Projects</span>
          </Link>
          <div className="pl-9 flex flex-col gap-1 mt-1">
            <Link
              href="/dashboard/projects"
              className="flex items-center gap-2 p-2 transition-all duration-300 text-on-surface-variant/70 hover:text-on-surface hover:bg-surface-variant/30 text-xs font-label-mono border-l border-white/5 hover:border-primary-container"
            >
              <MdList className="text-[14px]" />
              All Projects
            </Link>
            <Link
              href="/dashboard/projects/add"
              className="flex items-center gap-2 p-2 transition-all duration-300 text-on-surface-variant/70 hover:text-on-surface hover:bg-surface-variant/30 text-xs font-label-mono border-l border-white/5 hover:border-primary-container"
            >
              <MdAdd className="text-[14px]" />
              Add Project
            </Link>
          </div>
        </div>

        {/* Videos Menu */}
        <div className="flex flex-col group">
          <Link
            href="/dashboard/videos"
            className="flex items-center gap-3 p-3 transition-all duration-300 ease-in-out active:scale-95 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50"
          >
            <MdVideoLibrary className="text-xl" />
            <span className="font-label-mono text-label-mono flex-grow">Videos</span>
          </Link>
          <div className="pl-9 flex flex-col gap-1 mt-1">
            <Link
              href="/dashboard/videos"
              className="flex items-center gap-2 p-2 transition-all duration-300 text-on-surface-variant/70 hover:text-on-surface hover:bg-surface-variant/30 text-xs font-label-mono border-l border-white/5 hover:border-primary-container"
            >
              <MdList className="text-[14px]" />
              All Videos
            </Link>
            <Link
              href="/dashboard/videos/add"
              className="flex items-center gap-2 p-2 transition-all duration-300 text-on-surface-variant/70 hover:text-on-surface hover:bg-surface-variant/30 text-xs font-label-mono border-l border-white/5 hover:border-primary-container"
            >
              <MdVideoCall className="text-[14px]" />
              Add Video
            </Link>
          </div>
        </div>

        {/* Categories Menu */}
        <div className="flex flex-col group">
          <Link
            href="/dashboard/categories"
            className="flex items-center gap-3 p-3 transition-all duration-300 ease-in-out active:scale-95 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50"
          >
            <MdCategory className="text-xl" />
            <span className="font-label-mono text-label-mono flex-grow">Categories</span>
          </Link>
        </div>

        <Link
          href="#"
          className="flex items-center gap-3 p-3 transition-all duration-300 ease-in-out active:scale-95 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50"
        >
          <MdHub className="text-xl" />
          <span className="font-label-mono text-label-mono">Network Map</span>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 p-3 transition-all duration-300 ease-in-out active:scale-95 text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50"
        >
          <MdStorage className="text-xl" />
          <span className="font-label-mono text-label-mono">System Logs</span>
        </Link>
      </nav>
      <div className="p-6 space-y-4">
        <button className="w-full py-3 bg-primary-container text-on-primary-container font-label-caps text-label-caps tracking-widest hover:glow-sm transition-all">
          INITIATE SCAN
        </button>
        <div className="pt-4 border-t border-outline-variant/20 space-y-2">
          <Link
            href="#"
            className="flex items-center gap-3 p-2 text-on-surface-variant hover:text-primary-fixed transition-all font-label-mono text-label-mono"
          >
            <MdSettings className="text-xl" />
            Settings
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 p-2 text-on-surface-variant hover:text-primary-fixed transition-all font-label-mono text-label-mono"
          >
            <MdLogout className="text-xl" />
            Logout
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
