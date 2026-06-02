"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccentColor } from "@/store/themeSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";
import { MdMenu, MdPalette, MdDarkMode, MdTerminal, MdLogout, MdLogin } from "react-icons/md";

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const dispatch = useDispatch();
  const currentAccent = useSelector((state: RootState) => state.theme.accentColor);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/login";
  };

  const colors = [
    { name: "CYAN", value: "#00f2ff" },
    { name: "EMERALD", value: "#2ff801" },
    { name: "AMBER", value: "#ffb000" },
    { name: "CRIMSON", value: "#ff2e2e" },
    { name: "PURPLE", value: "#7318ff" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-margin-desktop h-16 bg-surface/70 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center gap-4">
        <button
          className="flex items-center justify-center w-9 h-9 border border-primary-container/30 bg-surface/50 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 rounded-sm glass-card group"
          id="menu-toggle"
          title="MAIN_MENU"
          onClick={onMenuToggle}
        >
          <MdMenu className="text-[20px]" />
        </button>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 mr-2 relative">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className={`flex items-center justify-center w-9 h-9 border border-primary-container/30 bg-surface/50 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 rounded-sm glass-card group ${showColorPicker ? "bg-primary-container text-on-primary-container" : ""}`}
            title="CHOOSE_ACCENT_COLOR"
          >
            <MdPalette className="text-[20px]" />
          </button>
          
          {showColorPicker && (
            <div className="absolute top-12 right-0 bg-surface-container-high border border-white/10 p-2 shadow-2xl rounded-sm z-[110] flex gap-2 backdrop-blur-xl">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => {
                    dispatch(setAccentColor(color.value));
                    setShowColorPicker(false);
                  }}
                  className={`w-6 h-6 rounded border border-white/10 transition-transform hover:scale-110 active:scale-95 ${currentAccent === color.value ? "ring-1 ring-white ring-offset-2 ring-offset-surface" : ""}`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          )}
          
          {/* <button
            className="flex items-center justify-center w-9 h-9 border border-primary-container/30 bg-surface/50 text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 rounded-sm glass-card group"
            title="TOGGLE_INTERFACE_MODE"
          >
            <MdDarkMode className="text-[20px]" />
          </button> */}
        </div>
        {user ? (
          <div className="flex items-center gap-2">
            <Link href={user.role === "root" ? "/dashboard" : "/chat"} className="flex items-center gap-2 px-4 py-1.5 border border-primary-container/30 text-label-caps font-label-caps text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all duration-300">
              <MdTerminal className="text-[18px]" />
              DASHBOARD
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-1.5 border border-error/30 text-label-caps font-label-caps text-error hover:bg-error hover:text-on-error transition-all duration-300">
              <MdLogout className="text-[18px]" />
            </button>
          </div>
        ) : (
          <Link href="/login" className="flex items-center gap-2 px-4 py-1.5 border border-primary-container/30 text-label-caps font-label-caps text-primary-container hover:bg-primary-container hover:text-on-primary-container transition-all duration-300">
            <MdLogin className="text-[18px]" />
            LOGIN
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
