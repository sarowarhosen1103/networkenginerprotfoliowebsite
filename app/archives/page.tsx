"use client";

import React from "react";
import ArchiveGrid from "@/components/projects/ArchiveGrid";
import HomepageProfile from "@/components/HomepageProfile";
import { useLayoutContext } from "@/components/Layout/ClientLayout";

export default function ArchivesPage() {
  const { isSidebarHidden } = useLayoutContext();

  return (
    <>
      <main
        className={`pt-24 pb-12 px-margin-mobile md:px-margin-desktop transition-all duration-500 flex flex-col lg:flex-row gap-8 ${
          isSidebarHidden ? "lg:ml-60" : "lg:ml-[360px]"
        }`}
      >
        <HomepageProfile isHidden={isSidebarHidden} />

        <div className="flex-1 max-w-container-max mx-auto space-y-12 w-full">
          <ArchiveGrid />
        </div>
      </main>
    </>
  );
}
