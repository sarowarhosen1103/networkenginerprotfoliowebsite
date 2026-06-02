"use client";

import React from "react";
import { SignupFooter } from "@/components/auth/SignupLayout";
import LoginForm from "@/components/auth/LoginForm";
import HomepageProfile from "@/components/HomepageProfile";
import { useLayoutContext } from "@/components/Layout/ClientLayout";

export default function LoginPage() {
  const { isSidebarHidden } = useLayoutContext();

  return (
    <>
      <main
        className={`pt-24 pb-12 px-margin-mobile md:px-margin-desktop transition-all duration-500 flex flex-col lg:flex-row gap-8 min-h-screen ${
          isSidebarHidden ? "lg:ml-60" : "lg:ml-[360px]"
        }`}
      >
        <HomepageProfile isHidden={isSidebarHidden} />
        
        <div className="flex-1 max-w-container-max mx-auto w-full flex flex-col ">
          <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch mb-12">
            {/* Left Panel: Identity Form */}
            <div className="lg:col-span-7 flex flex-col gap-8  justify-center ">
              <LoginForm />
            </div>
          </div>

          <SignupFooter />
        </div>
      </main>
    </>
  );
}
