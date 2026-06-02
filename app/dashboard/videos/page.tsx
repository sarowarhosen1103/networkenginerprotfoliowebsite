"use client";

import React, { useEffect, useState } from "react";
import { useLayoutContext } from "@/components/Layout/ClientLayout";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import Link from "next/link";

export default function AllVideosPage() {
  const { isSidebarHidden } = useLayoutContext();
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchVideos = async () => {
    try {
      const res = await fetch(`/api/videos?search=${search}`);
      const data = await res.json();
      if (data.videos) {
        setVideos(data.videos);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [search]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    try {
      const res = await fetch(`/api/videos/${id}`, { method: "DELETE" });
      if (res.ok) {
        setVideos((prev) => prev.filter((p) => p._id !== id));
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
              <span className="material-symbols-outlined">video_library</span>
              VIDEO ARCHIVES
            </h2>
            <Link
              href="/dashboard/videos/add"
              className="px-4 py-2 bg-primary-container text-on-primary-container font-label-caps text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,242,255,0.2)] flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              NEW VIDEO
            </Link>
          </div>

          <div className="mb-6 flex gap-4">
            <div className="flex-grow flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-2">
              <span className="material-symbols-outlined text-outline">search</span>
              <input
                type="text"
                placeholder="SEARCH VIDEOS..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-none outline-none text-label-mono text-sm w-full text-primary-container placeholder:text-outline"
              />
            </div>
          </div>

          <div className="flex-grow border border-white/10 bg-black/20 overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center font-label-mono text-outline">LOADING DATABASE...</div>
            ) : videos.length === 0 ? (
              <div className="p-8 text-center font-label-mono text-outline">NO VIDEOS FOUND</div>
            ) : (
              <table className="w-full text-left font-label-mono text-sm">
                <thead className="bg-white/5 text-primary-container border-b border-white/10">
                  <tr>
                    <th className="p-4 font-normal">THUMBNAIL</th>
                    <th className="p-4 font-normal">TITLE</th>
                    <th className="p-4 font-normal hidden md:table-cell">CATEGORY</th>
                    <th className="p-4 font-normal hidden lg:table-cell">CREATED</th>
                    <th className="p-4 font-normal text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {videos.map((video) => (
                    <tr key={video._id} className="hover:bg-white/5 transition-colors group">
                      <td className="p-4">
                        {video.thumbnailUrl ? (
                          <img src={video.thumbnailUrl} alt={video.title} className="w-16 h-10 object-cover border border-white/10" />
                        ) : (
                          <div className="w-16 h-10 bg-white/5 border border-white/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-outline text-[16px]">image</span>
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-on-surface">
                        <div>{video.title}</div>
                        <a href={video.videoUrl} target="_blank" rel="noreferrer" className="text-[10px] text-primary hover:underline">
                          Watch Link
                        </a>
                      </td>
                      <td className="p-4 hidden md:table-cell text-outline">{video.category}</td>
                      <td className="p-4 hidden lg:table-cell text-outline">
                        {new Date(video.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right space-x-3">
                        <Link href={`/dashboard/videos/${video._id}`} className="text-outline hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </Link>
                        <button onClick={() => handleDelete(video._id)} className="text-outline hover:text-error transition-colors">
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
