"use client";

import { useState, useEffect } from "react";
import VideoCard from "../video-archive/VideoCard";
import Link from "next/link";

const HomePageVideoArchive = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/videos?limit=6");
        const data = await res.json();
        if (data.videos) {
          setVideos(data.videos);
        }
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <section id="videos" className="space-y-12 mt-24">
      <div className="flex flex-col mb-12">
        <div className="flex items-center gap-4">
          <span className="h-4 w-1 bg-primary-container animate-pulse"></span>
          <h2 className="text-[48px] font-headline-xl tracking-tighter uppercase">
            VIDEO ARCHIVES
          </h2>
        </div>
        <div className="h-0.5 w-full bg-white/5 mt-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary-container w-1/4 animate-slide"></div>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <div className="font-label-mono text-primary-container animate-pulse">
            [ QUERYING DATABASE VIDEOS... ]
          </div>
        </div>
      ) : videos.length === 0 ? (
        <div className="py-20 flex justify-center items-center">
          <div className="font-label-mono text-outline">
            [ NO VIDEOS FOUND ]
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard 
              key={video._id}
              id={video._id.substring(0, 8).toUpperCase()}
              title={video.title}
              fileType={video.category.toUpperCase()}
              duration="00:00:00"
              encryption="AES-256_ACTIVE"
              lastAccess={new Date(video.createdAt).toLocaleDateString()}
              thumbnail={video.thumbnailUrl || "https://placehold.co/600x400/111111/00f2ff?text=NO+SIGNAL"}
              altText={video.title}
              videoUrl={video.videoUrl}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-12">
        <Link href="/videos" className="px-8 py-3 bg-primary-container/10 border border-primary-container/30 text-primary-container hover:bg-primary-container hover:text-on-primary-container font-label-caps text-[12px] tracking-widest transition-all glow-border">ACCESS FULL VIDEO ARCHIVE</Link>
      </div>
    </section>
  );
};

export default HomePageVideoArchive;
