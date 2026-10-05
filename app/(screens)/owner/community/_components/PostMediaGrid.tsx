"use client";

import { useState } from "react";
import { PostMedia } from "./mockData";
import LightboxModal from "./LightboxModal";

export default function PostMediaGrid({ media }: { media: PostMedia[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!media || media.length === 0) return null;

  const count = media.length;

  const renderImage = (img: PostMedia, index: number, className: string) => (
    <div 
      key={index} 
      onClick={() => setLightboxIndex(index)}
      className={`relative overflow-hidden bg-[#07090C] rounded-xl flex-shrink-0 cursor-pointer ${className}`}
    >
      <img src={img.url} alt="Post media" className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]" />
      {img.overlayText && (
        <div className="absolute left-3 top-3 px-2.5 py-0.5 bg-black/65 backdrop-blur-md border border-white/10 rounded-md shadow-sm z-10 pointer-events-none">
          <span className="font-['Nimbus_Sans'] font-semibold text-xs text-white">
            {img.overlayText}
          </span>
        </div>
      )}
    </div>
  );

  const renderGrid = () => {
    if (count === 1) {
      return (
        <div className="w-full max-h-[600px] mt-2 rounded-xl">
          {renderImage(media[0], 0, "w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]")}
        </div>
      );
    }

    if (count === 2) {
      return (
        <div className="w-full grid grid-cols-2 gap-3 mt-2 rounded-xl">
          {renderImage(media[0], 0, "w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px]")}
          {renderImage(media[1], 1, "w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px]")}
        </div>
      );
    }

    if (count === 3) {
      return (
        <div className="w-full grid grid-cols-2 gap-3 mt-2 rounded-xl h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
          {renderImage(media[0], 0, "w-full h-full")}
          <div className="grid grid-rows-2 gap-3 h-full">
            {renderImage(media[1], 1, "w-full h-full")}
            {renderImage(media[2], 2, "w-full h-full")}
          </div>
        </div>
      );
    }

    if (count === 4) {
      return (
        <div className="w-full grid grid-cols-2 gap-3 mt-2 rounded-xl h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
          {media.map((img, i) => renderImage(img, i, "w-full h-full"))}
        </div>
      );
    }

    if (count >= 5) {
      return (
        <div className="w-full flex flex-col gap-3 mt-2 rounded-xl h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
          <div className="grid grid-cols-2 gap-3 h-1/2">
            {renderImage(media[0], 0, "w-full h-full")}
            {renderImage(media[1], 1, "w-full h-full")}
          </div>
          <div className="grid grid-cols-3 gap-3 h-1/2">
            {renderImage(media[2], 2, "w-full h-full")}
            {renderImage(media[3], 3, "w-full h-full")}
            {renderImage(media[4], 4, "w-full h-full")}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {renderGrid()}
      {lightboxIndex !== null && (
        <LightboxModal
          media={media}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
