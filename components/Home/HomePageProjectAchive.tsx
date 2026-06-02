"use client";

import { useState, useEffect } from "react";
import ArchiveCard from "../projects/ArchiveCard";
import Link from "next/link";

const HomePageProjectAchive = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects?limit=6");
        const data = await res.json();
        if (data.projects) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="space-y-12">
      <div className="flex flex-col mb-12">
        <div className="flex items-center gap-4">
          <span className="h-4 w-1 bg-primary-container animate-pulse"></span>
          <h2 className="text-[48px] font-headline-xl tracking-tighter uppercase">
            PROJECT ARCHIVES
          </h2>
        </div>
        <div className="h-0.5 w-full bg-white/5 mt-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary-container w-1/4 animate-slide"></div>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <div className="font-label-mono text-primary-container animate-pulse">
            [ QUERYING DATABASE ARCHIVES... ]
          </div>
        </div>
      ) : projects.length === 0 ? (
        <div className="py-20 flex justify-center items-center">
          <div className="font-label-mono text-outline">
            [ NO ARCHIVES FOUND ]
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ArchiveCard 
              key={project._id}
              id={project._id.substring(0, 8).toUpperCase()}
              status="SYSTEM"
              statusType="optimal"
              title={project.title}
              description={project.description}
              codeSnippet={project.codeSnippet}
              tags={project.tags}
              realId={project._id}
              projectUrl={project.projectUrl}
              demoUrl={project.demoUrl}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-12">
        <Link 
          href="/archives"
          className="px-8 py-3 bg-primary-container/10 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container font-label-caps text-[12px] tracking-widest transition-all glow-border"
        >
          ACCESS FULL ARCHIVE
        </Link>
      </div>
    </section>
  );
};

export default HomePageProjectAchive;
