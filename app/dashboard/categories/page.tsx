"use client";

import React, { useEffect, useState } from "react";
import { useLayoutContext } from "@/components/Layout/ClientLayout";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

export default function CategoriesPage() {
  const { isSidebarHidden } = useLayoutContext();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [type, setType] = useState<"project" | "video">("project");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.categories) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) return;

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), type }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("Category added successfully!");
        setName("");
        fetchCategories();
      } else {
        setError(data.error || "Failed to add category");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSuccess("Category deleted successfully!");
        setCategories((prev) => prev.filter((c) => c._id !== id));
      } else {
        const data = await res.json();
        setError(data.error || "Failed to delete category");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <main
      className={`pt-24 pb-12 px-margin-mobile md:px-margin-desktop transition-all duration-500 flex flex-col gap-8 min-h-[calc(100vh-100px)] relative z-10 ${
        isSidebarHidden ? "lg:ml-60" : "lg:ml-[360px]"
      }`}
    >
      <div className="p-gutter max-w-container-max mx-auto space-y-gutter w-full flex-grow flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: List Categories */}
        <div className="bg-surface-container/50 backdrop-blur-xl border border-outline-variant/30 p-6 flex flex-col flex-grow lg:w-2/3">
          <h2 className="font-headline-md text-headline-md text-primary flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined">category</span>
            SYSTEM CATEGORIES
          </h2>

          <div className="flex-grow border border-white/10 bg-black/20 overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center font-label-mono text-outline">LOADING DATABASE...</div>
            ) : categories.length === 0 ? (
              <div className="p-8 text-center font-label-mono text-outline">NO CATEGORIES IN DATABASE</div>
            ) : (
              <table className="w-full text-left font-label-mono text-sm">
                <thead className="bg-white/5 text-primary-container border-b border-white/10">
                  <tr>
                    <th className="p-4 font-normal">NAME</th>
                    <th className="p-4 font-normal">TYPE</th>
                    <th className="p-4 font-normal text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {categories.map((category) => (
                    <tr key={category._id} className="hover:bg-white/5 transition-colors group">
                      <td className="p-4 text-on-surface">{category.name}</td>
                      <td className="p-4">
                        <span className={`text-[10px] px-2 py-0.5 rounded-sm border ${
                          category.type === "project" 
                            ? "bg-primary/10 text-primary border-primary/20" 
                            : "bg-secondary-container/10 text-secondary-container border-secondary-container/20"
                        }`}>
                          {category.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleDelete(category._id)} className="text-outline hover:text-error transition-colors">
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

        {/* Right Column: Add Category Form */}
        <div className="bg-surface-container/50 backdrop-blur-xl border border-outline-variant/30 p-6 lg:w-1/3 h-fit font-label-mono">
          <h3 className="text-lg text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined">add_box</span>
            ADD NEW CATEGORY
          </h3>

          {error && (
            <div className="mb-4 p-2 bg-error/10 border border-error/50 text-error text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">warning</span>
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-2 bg-primary/10 border border-primary/50 text-primary text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              {success}
            </div>
          )}

          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-primary-container">CATEGORY NAME</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 p-2.5 text-sm text-on-surface focus:border-primary outline-none transition-colors"
                placeholder="e.g. Cyber Security"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-primary-container">SYSTEM CLASSIFICATION</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as "project" | "video")}
                className="w-full bg-black/40 border border-white/10 p-2.5 text-sm text-on-surface focus:border-primary outline-none transition-colors appearance-none"
              >
                <option value="project">Project (Text/Code Archive)</option>
                <option value="video">Video (Media Archive)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-primary-container text-on-primary-container font-label-caps font-bold tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_0_10px_rgba(0,242,255,0.2)]"
            >
              CREATE CATEGORY
            </button>
          </form>
        </div>

      </div>
      <DashboardFooter />
    </main>
  );
}
