"use client";

import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";

interface VideoFilterProps {
  search: string;
  onSearchChange: (search: string) => void;
  category: string;
  onCategoryChange: (category: string) => void;
}

const VideoFilter: React.FC<VideoFilterProps> = ({
  search,
  onSearchChange,
  category,
  onCategoryChange,
}) => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories?type=video");
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
    <div className="bg-surface-container-low/80 backdrop-blur-md border border-white/10 p-6 flex flex-col md:flex-row gap-6">
      <div className="flex-1 relative font-label-mono">
        <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg" />
        <input
          className="w-full bg-surface-container-lowest border border-white/10 py-3 pl-12 pr-4 font-label-mono text-label-mono text-primary-container focus:outline-none focus:border-primary-container transition-colors"
          placeholder="SEARCH_DATABASE..."
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-4 font-label-mono">
        <div className="flex items-center gap-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant">VIDEO_TYPE:</span>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="bg-surface-container-lowest border border-white/10 font-label-mono text-label-mono px-4 py-2 text-primary-container focus:outline-none cursor-pointer appearance-none"
          >
            <option value="ALL">ALL_FILES</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name.toUpperCase().replace(/\s+/g, "_")}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant">CLEARANCE:</span>
          <select className="bg-surface-container-lowest border border-white/10 font-label-mono text-label-mono px-4 py-2 text-primary-container focus:outline-none cursor-pointer appearance-none">
            <option>LEVEL_0</option>
            <option>LEVEL_1</option>
            <option>LEVEL_2</option>
            <option>TOP_SECRET</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default VideoFilter;
