"use client";

import React, { useState, useEffect } from "react";
import ArchiveFilter from "./ArchiveFilter";
import ArchiveCard from "./ArchiveCard";
import { MdExpandMore } from "react-icons/md";

const ArchiveGrid = () => {
  const [filter, setFilter] = useState("ALL");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const url = filter === "ALL" ? "/api/projects" : `/api/projects?category=${filter}`;
        const res = await fetch(url);
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
  }, [filter]);

  return (
    <div className="max-w-container-max mx-auto">
      <ArchiveFilter activeFilter={filter} onFilterChange={setFilter} />
      
      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <div className="font-label-mono text-primary-container animate-pulse">
            [ QUERYING_DATABASE_ARCHIVES... ]
          </div>
        </div>
      ) : projects.length === 0 ? (
        <div className="py-20 flex justify-center items-center">
          <div className="font-label-mono text-outline">
            [ NO_ARCHIVES_FOUND_IN_THIS_CATEGORY ]
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ArchiveCard 
                key={project._id}
                id={project._id.substring(0, 8).toUpperCase()}
                status="SYSTEM_OPTIMAL"
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

          <div className="mt-12 flex justify-center">
            <button className="px-8 py-3 glass-panel border-white/20 hover:border-primary-container text-on-surface-variant hover:text-primary-container font-label-caps text-[12px] transition-all flex items-center gap-3">
              <MdExpandMore className="text-lg" />
              FETCH_NEXT_SEQUENCE
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ArchiveGrid;
