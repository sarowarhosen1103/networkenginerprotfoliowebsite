"use client";

import React from "react";
import { MdLockOpen, MdDownload } from "react-icons/md";
import Link from "next/link";

interface VideoCardProps {
  id: string;
  title: string;
  fileType: string;
  duration: string;
  encryption: string;
  lastAccess: string;
  thumbnail: string;
  altText: string;
  videoUrl?: string;
  realId?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  id,
  title,
  fileType,
  thumbnail,
  altText,
  realId,
}) => {
  return (
    <div className="group relative bg-surface-container-lowest/50 border border-white/10 overflow-hidden hover:border-primary-container transition-all duration-300">
      <div className="aspect-video relative overflow-hidden">
        <img
          alt={altText}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
          src={thumbnail}
        />
        <div className="absolute inset-0 bg-primary-container/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Link href={`/videos/${realId || id}`} className="bg-primary-container text-on-primary-container px-6 py-2 font-label-caps text-label-caps flex items-center gap-2 active:scale-95 transition-transform shadow-[0_0_15px_rgba(var(--color-primary-container-rgb),0.4)] hover:bg-primary">
            <MdLockOpen className="text-[20px]" />
            VIEW PROJECT VIDEO
          </Link>
        </div>
        <div className="scanline-overlay absolute inset-0 opacity-20 group-hover:opacity-40"></div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface uppercase mb-1 leading-tight">
              {title}
            </h3>
            <p className="font-label-caps text-label-caps text-secondary-container text-sm">
              FILE TYPE: {fileType}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
