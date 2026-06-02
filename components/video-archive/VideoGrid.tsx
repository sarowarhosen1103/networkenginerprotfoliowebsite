"use client";

import React, { useState, useEffect } from "react";
import VideoCard from "./VideoCard";

interface VideoGridProps {
  category: string;
  search: string;
}

const VideoGrid: React.FC<VideoGridProps> = ({ category, search }) => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        let url = `/api/videos?search=${encodeURIComponent(search)}`;
        if (category !== "ALL") {
          url += `&category=${encodeURIComponent(category)}`;
        }
        
        const res = await fetch(url);
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
  }, [category, search]);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="font-label-mono text-primary-container animate-pulse">
          [ DECRYPTING_VIDEO_ARCHIVES... ]
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="font-label-mono text-outline">
          [ NO_VIDEOS_FOUND ]
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
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
          realId={video._id}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
