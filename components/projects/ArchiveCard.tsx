"use client";

import React from "react";
import { MdLock, MdWarning } from "react-icons/md";
import { FaGithub, FaGlobe } from "react-icons/fa";
import Link from "next/link";

interface CodeLine {
  text: string;
  className?: string;
}

interface ArchiveCardProps {
  id: string;
  status: string;
  statusType: "optimal" | "encrypted" | "interrupted" | "standby";
  title: string;
  description: string;
  codeLines?: CodeLine[];
  codeSnippet?: string;
  tags: string[];
  realId?: string;
  projectUrl?: string;
  demoUrl?: string;
}

const ArchiveCard: React.FC<ArchiveCardProps> = ({
  id,
  status,
  statusType,
  title,
  description,
  codeLines,
  codeSnippet,
  tags,
  realId,
  projectUrl,
  demoUrl,
}) => {
  // Use fallbacks so that demo and repository icons ALWAYS render beautiful preview links
  const finalProjectUrl = projectUrl || "https://github.com/wahidahmed/network-portfolio";
  const finalDemoUrl = demoUrl || "https://github.com/wahidahmed/network-portfolio";

  const getStatusIcon = () => {
    switch (statusType) {
      case "optimal":
        return <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse"></span>;
      case "encrypted":
        return <MdLock className="text-[14px]" />;
      case "interrupted":
        return <MdWarning className="text-[14px]" />;
      case "standby":
        return <span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant opacity-50"></span>;
      default:
        return null;
    }
  };

  const getStatusColorClass = () => {
    switch (statusType) {
      case "optimal": return "text-secondary-container";
      case "encrypted": return "text-on-tertiary-container";
      case "interrupted": return "text-error";
      case "standby": return "text-on-surface-variant";
      default: return "";
    }
  };

  return (
    <div className="glass-panel group p-5 rounded-lg flex flex-col gap-4 glow-border transition-all duration-300">
      <div className="flex justify-between items-start">
        <span className="font-label-mono text-[10px] text-primary-container bg-primary-container/10 px-2 py-0.5 border border-primary-container/30">
          {id}
        </span>
        <span className={`font-label-mono text-[10px] ${getStatusColorClass()} flex items-center gap-1`}>
          {getStatusIcon()} [{status}]
        </span>
      </div>
      <div className="flex flex-col">
        <h3 className="font-headline-md text-headline-md font-bold text-on-surface group-hover:text-primary-container transition-colors">
          {title}
        </h3>
        <p className="font-body-md text-on-surface-variant text-[14px] mt-2 line-clamp-2">
          {description}
        </p>
      </div>
      
      {/* Code Snippet Area */}
      <div className="bg-surface-container-lowest p-3 rounded font-label-mono text-[11px] text-on-surface-variant/80 border border-white/5">
        {codeLines ? (
          codeLines.map((line, index) => (
            <p key={index} className={line.className}>
              {line.text}
            </p>
          ))
        ) : codeSnippet ? (
          <pre className="whitespace-pre-wrap break-all">{codeSnippet}</pre>
        ) : (
          <p className="text-outline italic">// No snippet available</p>
        )}
      </div>

       {finalProjectUrl && (
            <a
              href={finalProjectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary transition-colors flex gap-1.5  justify-center  items-center p-2 font-bold  hover:bg-white/5 rounded border"
              title="View GitHub Repository"
            >
              <FaGithub className="text-base" /> PROJECT 
            </a>
          )}

      <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-white/5">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-white/5 px-2 py-1 font-label-mono text-[10px] border border-white/10 text-on-surface-variant"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {realId && (
            <Link
              href={`/archives/${realId}`}
              className="text-primary-container hover:text-primary font-label-caps text-[11px] flex items-center gap-1 active:scale-95 transition-all"
            >
              View Project &gt;
            </Link>
          )}
         
         
        </div>
      </div>
    </div>
  );
};

export default ArchiveCard;
