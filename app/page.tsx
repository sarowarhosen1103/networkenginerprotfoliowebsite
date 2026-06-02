"use client";

import React from "react";
import Hero from "@/components/Hero";
import IdentityMission from "@/components/IdentityMission";
import Competencies from "@/components/Competencies";
import Timeline from "@/components/Timeline";
import SkillsStack from "@/components/SkillsStack";
import Footer from "@/components/Footer";
import HomepageProfile from "@/components/HomepageProfile";
import LeftRightSkillAnimation from "@/components/Logo_animation/LeftRightSkillAnimation";
import HomePageProjectAchive from "@/components/Home/HomePageProjectAchive";
import HomePageVideoArchive from "@/components/Home/HomePageVideoArchive";
import { useLayoutContext } from "@/components/Layout/ClientLayout";

export default function Home() {
  const { isSidebarHidden } = useLayoutContext();

  return (
    <>
      <main
        className={`pt-24 pb-12 px-margin-mobile md:px-margin-desktop transition-all duration-500 flex flex-col lg:flex-row gap-8 ${
          isSidebarHidden ? "lg:ml-60" : "lg:ml-[360px]"
        }`}
      >
        <HomepageProfile isHidden={isSidebarHidden} />
        
        <div className="flex-1 max-w-container-max mx-auto space-y-section-gap w-full">
          <Hero />
          {/* <LeftRightSkillAnimation /> */}
          <IdentityMission />
          <Competencies />
          
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <Timeline />
            <SkillsStack />
          </section>

          <HomePageProjectAchive />
          <HomePageVideoArchive />
          <Footer />
        </div>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.4)] hover:scale-110 active:scale-90 transition-all z-[110]">
        <span className="material-symbols-outlined">chat_bubble</span>
      </button>
    </>
  );
}
