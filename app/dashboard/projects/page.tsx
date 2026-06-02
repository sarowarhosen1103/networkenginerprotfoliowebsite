"use client";

import React, { useEffect, useState } from "react";
import { useLayoutContext } from "@/components/Layout/ClientLayout";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import Link from "next/link";

export default function AllProjectsPage() {
  const { isSidebarHidden } = useLayoutContext();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await fetch(`/api/projects?search=${search}`);
      const data = await res.json();
      if (data.projects) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [search]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main
      className={`pt-24 pb-12 px-margin-mobile md:px-margin-desktop transition-all duration-500 flex flex-col gap-8 min-h-[calc(100vh-100px)] relative z-10 ${
        isSidebarHidden ? "lg:ml-60" : "lg:ml-[360px]"
      }`}
    >
      <div className="p-gutter max-w-container-max mx-auto space-y-gutter w-full flex-grow flex flex-col">
        <div className="bg-surface-container/50 backdrop-blur-xl border border-outline-variant/30 p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-md text-headline-md text-primary flex items-center gap-2">
              <span className="material-symbols-outlined">folder_special</span>
              PROJECT ARCHIVES
            </h2>
            <Link
              href="/dashboard/projects/add"
              className="px-4 py-2 bg-primary-container text-on-primary-container font-label-caps text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,242,255,0.2)] flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              NEW PROJECT
            </Link>
          </div>

          <div className="mb-6 flex gap-4">
            <div className="flex-grow flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-2">
              <span className="material-symbols-outlined text-outline">search</span>
              <input
                type="text"
                placeholder="SEARCH PROJECTS..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none outline-none text-label-mono text-sm w-full text-primary-container placeholder:text-outline"
              />
            </div>
          </div>

          <div className="flex-grow border border-white/10 bg-black/20 overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center font-label-mono text-outline">LOADING DATABASE...</div>
            ) : projects.length === 0 ? (
              <div className="p-8 text-center font-label-mono text-outline">NO PROJECTS FOUND</div>
            ) : (
              <table className="w-full text-left font-label-mono text-sm">
                <thead className="bg-white/5 text-primary-container border-b border-white/10">
                  <tr>
                    <th className="p-4 font-normal">TITLE</th>
                    <th className="p-4 font-normal">CATEGORY</th>
                    <th className="p-4 font-normal hidden md:table-cell">TAGS</th>
                    <th className="p-4 font-normal hidden lg:table-cell">CREATED</th>
                    <th className="p-4 font-normal text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {projects.map((project) => (
                    <tr key={project._id} className="hover:bg-white/5 transition-colors group">
                      <td className="p-4 text-on-surface">{project.title}</td>
                      <td className="p-4 text-outline">{project.category}</td>
                      <td className="p-4 hidden md:table-cell">
                        <div className="flex gap-2 flex-wrap">
                          {project.tags.slice(0, 3).map((tag: string) => (
                            <span key={tag} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-sm border border-primary/20">
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && <span className="text-[10px] text-outline">+{project.tags.length - 3}</span>}
                        </div>
                      </td>
                      <td className="p-4 hidden lg:table-cell text-outline">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right space-x-3">
                        <Link href={`/dashboard/projects/${project._id}`} className="text-outline hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </Link>
                        <button onClick={() => handleDelete(project._id)} className="text-outline hover:text-error transition-colors">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <DashboardFooter />
    </main>
  );
}
