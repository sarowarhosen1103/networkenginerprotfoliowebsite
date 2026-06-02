"use client";

import React, { useState, useEffect } from "react";
import HomepageProfile from "@/components/HomepageProfile";
import { useLayoutContext } from "@/components/Layout/ClientLayout";
import { parseMarkdown } from "@/components/dashboard/MarkdownEditor";
import { MdArrowBack, MdContentCopy, MdCheck, MdTerminal, MdCode, MdBookmarkBorder } from "react-icons/md";
import { FaGithub, FaGlobe } from "react-icons/fa";
import Link from "next/link";

export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { isSidebarHidden } = useLayoutContext();
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeConfigIndex, setActiveConfigIndex] = useState(0);
  const [copiedDeviceConfig, setCopiedDeviceConfig] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        const data = await res.json();
        if (data.project) {
          setProject(data.project);
        }
      } catch (err) {
        console.error("Failed to load project details:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProject();
    }
  }, [id]);

  const copyToClipboard = (text: string, type: "command" | "code" | "deviceConfig") => {
    navigator.clipboard.writeText(text);
    if (type === "command") {
      setCopiedCommand(true);
      setTimeout(() => setCopiedCommand(false), 2000);
    } else if (type === "code") {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedDeviceConfig(true);
      setTimeout(() => setCopiedDeviceConfig(false), 2000);
    }
  };

  if (loading) {
    return (
      <main className={`pt-24 pb-12 flex justify-center items-center min-h-screen ${isSidebarHidden ? "lg:ml-60" : "lg:ml-[360px]"}`}>
        <div className="font-label-mono text-primary-container animate-pulse">[ SECURING_CONNECTION_AND_DECRYPTING_LOGS... ]</div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className={`pt-24 pb-12 px-margin-mobile md:px-margin-desktop min-h-screen flex flex-col justify-center items-center ${isSidebarHidden ? "lg:ml-60" : "lg:ml-[360px]"}`}>
        <div className="font-label-mono text-error uppercase mb-4">[ ERROR: ARCHIVE_NOT_FOUND_OR_ACCESS_DENIED ]</div>
        <Link href="/archives" className="px-6 py-2 border border-white/10 hover:border-primary-container text-on-surface-variant hover:text-primary-container transition-all font-label-caps text-xs">
          RETURN_TO_ARCHIVES
        </Link>
      </main>
    );
  }

  return (
    <main
      className={`pt-24 pb-12 px-margin-mobile md:px-margin-desktop transition-all duration-500 flex flex-col lg:flex-row gap-8 ${
        isSidebarHidden ? "lg:ml-60" : "lg:ml-[360px]"
      }`}
    >
      <HomepageProfile isHidden={isSidebarHidden} />

      <div className="flex-1 max-w-container-max mx-auto w-full space-y-8">
        {/* Navigation back */}
        <Link
          href="/archives"
          className="inline-flex items-center gap-2 font-label-caps text-[12px] text-on-surface-variant hover:text-primary-container transition-colors"
        >
          <MdArrowBack className="text-base" /> RETURN_TO_ARCHIVES
        </Link>

        {/* Header Decrypt Widget */}
        <div className="glass-panel border-white/15 p-6 md:p-8 rounded-lg flex flex-col gap-6 relative overflow-hidden">
          <div className="scanline-overlay absolute inset-0 opacity-[0.15]"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-label-mono text-[10px] text-primary-container bg-primary-container/10 px-2 py-0.5 border border-primary-container/30">
                  SECURE_FILE: {project._id.substring(0, 8).toUpperCase()}
                </span>
                <span className="text-[10px] font-label-mono text-secondary-container bg-secondary-container/10 border border-secondary-container/20 px-2 py-0.5">
                  {project.category.toUpperCase()}
                </span>
              </div>
              <h1 className="font-headline-xl text-3xl font-extrabold text-on-background uppercase tracking-tight flex items-center gap-3">
                {project.title}
                <a
                  href={project.projectUrl || "https://github.com/wahidahmed/network-portfolio"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-on-surface-variant hover:text-primary transition-colors p-1.5 hover:bg-white/5 rounded-full"
                  title="View GitHub Repository"
                >
                  <FaGithub className="text-2xl" />
                </a>
              </h1>
            </div>
            <div className="text-right font-label-mono text-[11px] text-outline">
              <div>LAST_SYNC: {new Date(project.updatedAt).toLocaleDateString()}</div>
              <div className="text-primary-container mt-1">// CLASSIFIED_SYSTEM_OPTIMAL</div>
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-t border-white/10 pt-6 relative z-10">
            
            {/* Left/Middle Columns: Description & Rich Content */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Short summary description */}
              <div className="bg-surface-container-lowest/50 border-l-2 border-primary-container p-4 rounded-r-md">
                <p className="text-on-surface font-body-md leading-relaxed italic">
                  &quot;{project.description}&quot;
                </p>
              </div>

              {/* Rich Content Markdown rendered */}
              <div className="space-y-4">
                <h3 className="font-label-caps text-sm text-primary-container border-b border-white/10 pb-2 flex items-center gap-2">
                  <MdBookmarkBorder className="text-base" /> DETAILED_SYSTEM_SPECIFICATIONS
                </h3>
                <div 
                  className="font-body-md text-on-surface-variant leading-relaxed space-y-4 markdown-rendered-content"
                  dangerouslySetInnerHTML={{ __html: parseMarkdown(project.content) }}
                />
              </div>


              {/* Algorithm Snippet block */}
              {project.codeSnippet && (
                <div className="space-y-2">
                  <h4 className="font-label-caps text-xs text-secondary-container">CORE_ALGORITHM_SNIPPET</h4>
                  <div className="relative border border-white/15 rounded bg-surface-container-lowest/90 overflow-hidden">
                    <div className="flex justify-between items-center bg-surface-container-low px-4 py-2 border-b border-white/10">
                      <span className="font-label-mono text-[11px] text-outline flex items-center gap-1.5">
                        <MdCode className="text-sm" /> CODE_SEQUENCE
                      </span>
                      <button
                        onClick={() => copyToClipboard(project.codeSnippet, "code")}
                        className="text-xs hover:text-primary-container flex items-center gap-1 font-label-caps text-outline transition-colors"
                      >
                        {copiedCode ? (
                          <>
                            <MdCheck className="text-green-500 text-sm" /> COPIED
                          </>
                        ) : (
                          <>
                            <MdContentCopy className="text-sm" /> COPY_CODE
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 overflow-x-auto font-label-mono text-xs text-primary-container/90 whitespace-pre leading-relaxed custom-scrollbar">
                      {project.codeSnippet}
                    </pre>
                  </div>
                </div>
              )}

              {/* Dynamic Device Configurations */}
              {project.configurations && project.configurations.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-label-caps text-xs text-secondary-container">DEVICE_CONFIGURATIONS</h4>
                  
                  <div className="border border-white/15 rounded bg-surface-container-lowest/90 overflow-hidden flex flex-col">
                    {/* Device tabs */}
                    <div className="flex flex-wrap bg-surface-container-low border-b border-white/10 px-2 pt-2 gap-1">
                      {project.configurations.map((config: any, index: number) => (
                        <button
                          key={index}
                          onClick={() => {
                            setActiveConfigIndex(index);
                            setCopiedDeviceConfig(false);
                          }}
                          className={`px-4 py-2 font-label-mono text-xs border-t border-x rounded-t transition-all ${
                            activeConfigIndex === index
                              ? "bg-black/60 text-primary-container border-white/15 border-b-transparent"
                              : "border-transparent text-outline hover:text-white"
                          }`}
                        >
                          {config.name.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    {/* Terminal body */}
                    <div className="relative bg-black/60 p-4 min-h-[150px] flex flex-col">
                      <div className="flex justify-between items-center text-[10px] font-label-mono text-outline mb-2 pb-1.5 border-b border-white/5">
                        <span className="text-secondary-container">// CONFIG_STREAM: {project.configurations[activeConfigIndex]?.name.toUpperCase()}</span>
                        <button
                          onClick={() => copyToClipboard(project.configurations[activeConfigIndex]?.commands || "", "deviceConfig")}
                          className="hover:text-primary-container flex items-center gap-1 font-label-caps transition-colors"
                        >
                          {copiedDeviceConfig ? (
                            <>
                              <MdCheck className="text-green-500 text-[11px]" /> COPIED
                            </>
                          ) : (
                            <>
                              <MdContentCopy className="text-[11px]" /> COPY_STREAM
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="flex-grow font-mono text-xs text-green-500 whitespace-pre overflow-x-auto leading-relaxed custom-scrollbar">
                        {project.configurations[activeConfigIndex]?.commands || "// NO CONFIGURATION COMMANDS SUPPLIED"}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sidebar Specs, Image Frame */}
            <div className="space-y-6">
              {/* Image box */}
              {project.imageUrl ? (
                <div className="border border-white/15 p-2 rounded bg-surface-container-lowest/50 relative overflow-hidden group">
                  <div className="aspect-[4/3] rounded overflow-hidden relative">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-primary-container/5 mix-blend-overlay"></div>
                  </div>
                  <div className="text-center font-label-mono text-[9px] text-outline mt-2 tracking-wider">
                    // DATABASE_SECURE_IMAGE_VISUAL
                  </div>
                </div>
              ) : (
                <div className="border border-dashed border-white/15 p-8 rounded bg-surface-container-lowest/30 text-center flex flex-col justify-center items-center aspect-[4/3]">
                  <span className="material-symbols-outlined text-outline text-[40px] mb-2 animate-pulse">
                    visibility_off
                  </span>
                  <div className="font-label-mono text-[10px] text-outline">
                    // IMAGE_SIGNAL_ABSENT
                  </div>
                </div>
              )}

              {/* Project Link Panel */}
              <div className="glass-panel border-white/10 p-5 rounded-lg space-y-3">
                <h4 className="font-label-caps text-xs text-primary-container">EXTERNAL_RESOURCES</h4>
                
                <a
                  href={project.projectUrl || "https://github.com/wahidahmed/network-portfolio"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 border border-primary/30 hover:border-primary text-primary hover:bg-primary/5 transition-all text-xs font-label-caps flex items-center justify-center gap-2 rounded bg-black/30 font-bold uppercase tracking-wider"
                >
                  <FaGithub className="text-base" /> VIEW_GITHUB_REPOSITORY
                </a>

                <a
                  href={project.demoUrl || "https://github.com/wahidahmed/network-portfolio"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 border border-secondary/30 hover:border-secondary text-secondary hover:bg-secondary/5 transition-all text-xs font-label-caps flex items-center justify-center gap-2 rounded bg-black/30 font-bold uppercase tracking-wider mt-2"
                >
                  <FaGlobe className="text-base" /> LAUNCH_LIVE_DEMO
                </a>
              </div>

              {/* Tags Panel */}
              <div className="glass-panel border-white/10 p-5 rounded-lg space-y-3">
                <h4 className="font-label-caps text-xs text-primary-container">CLASSIFIED_TAGS</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string, index: number) => (
                    <span 
                      key={index}
                      className="bg-primary-container/10 px-2 py-1 font-label-mono text-[10px] border border-primary-container/20 text-primary-container"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* System Specs Mock widgets */}
              <div className="glass-panel border-white/10 p-5 rounded-lg space-y-4 font-label-mono text-[11px]">
                <h4 className="font-label-caps text-xs text-secondary-container border-b border-white/10 pb-2">
                  SECURITY_METRICS
                </h4>
                <div className="flex justify-between">
                  <span className="text-outline">CONNECTION:</span>
                  <span className="text-green-500 font-bold">SECURE_SSL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">CIPHER_SUITE:</span>
                  <span className="text-secondary-container">AES_256_GCM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">ACCESS_LEVEL:</span>
                  <span className="text-primary-container font-bold">ROOT_AUTHORIZED</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-outline">INTEGRITY_CHECK:</span>
                  <span className="text-green-500">100%_OPTIMAL</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
