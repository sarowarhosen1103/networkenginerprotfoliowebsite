"use client";

import React, { useEffect, useState } from "react";
import { MdTerminal } from "react-icons/md";

interface ArchiveFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const ArchiveFilter: React.FC<ArchiveFilterProps> = ({ activeFilter, onFilterChange }) => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories?type=project");
        const data = await res.json();
        if (data.categories) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="glass-panel p-6 mb-12 rounded-lg border-primary-container/20 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-2 flex gap-1 opacity-40">
        <span className="w-2 h-2 rounded-full bg-error"></span>
        <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
        <span className="w-2 h-2 rounded-full bg-primary-container"></span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-3 font-label-mono text-label-mono">
          <button
            onClick={() => onFilterChange("ALL")}
            className={`px-4 py-2 border transition-all ${
              activeFilter === "ALL"
                ? "bg-primary-container text-surface border-primary-container font-bold shadow-[0_0_10px_rgba(0,242,255,0.3)]"
                : "border-white/10 hover:border-primary-container/50 hover:text-primary-container text-on-surface-variant bg-white/5"
            }`}
          >
            ALL PROJECT
          </button>
          
          {categories.map((category) => {
            const formattedLabel = category.name 
            // .toUpperCase().replace(/\s+/g, "_");
            return (
              <button
                key={category._id}
                onClick={() => onFilterChange(category.name)}
                className={`px-4 py-2 border transition-all ${
                  activeFilter === category.name
                    ? "bg-primary-container text-surface border-primary-container font-bold shadow-[0_0_10px_rgba(0,242,255,0.3)]"
                    : "border-white/10 hover:border-primary-container/50 hover:text-primary-container text-on-surface-variant bg-white/5"
                }`}
              >
                {formattedLabel}
              </button>
            );
          })}
          <span className="terminal-cursor"></span>
        </div>
      </div>
    </section>
  );
};

export default ArchiveFilter;
