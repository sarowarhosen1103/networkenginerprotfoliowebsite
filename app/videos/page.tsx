"use client";

import React, { useState } from "react";
import { VideoFooter } from "@/components/video-archive/VideoLayout";
import VideoFilter from "@/components/video-archive/VideoFilter";
import VideoGrid from "@/components/video-archive/VideoGrid";
import VideoMetrics from "@/components/video-archive/VideoMetrics";
import HomepageProfile from "@/components/HomepageProfile";
import { useLayoutContext } from "@/components/Layout/ClientLayout";

export default function VideoArchivePage() {
  const { isSidebarHidden } = useLayoutContext();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  return (
    <>
      <main
        className={`pt-24 pb-12 px-margin-mobile md:px-margin-desktop transition-all duration-500 flex flex-col lg:flex-row  ${
          isSidebarHidden ? "lg:ml-60" : "lg:ml-[360px]"
        }`}
      >
        <HomepageProfile isHidden={isSidebarHidden} />
        
        <div className="flex-1 max-w-container-max mx-auto w-full">
          {/* PAGE HEADER */}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-gutter">
            {/* CONTENT COLUMN (3/4) */}
            <div className="lg:col-span-4 space-y-gutter">
              <VideoFilter 
                search={search}
                onSearchChange={setSearch}
                category={category}
                onCategoryChange={setCategory}
              />
              <VideoGrid 
                search={search}
                category={category}
              />
            </div>            
          </div>

        </div>
      </main>
    </>
  );
}
