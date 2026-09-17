import { User } from "@phosphor-icons/react";

interface AvatarProps {
  src?: string | null;
  gender?: "male" | "female" | "other" | null;
  className?: string;
  alt?: string;
}

export default function Avatar({ src, gender, className = "", alt = "User Avatar" }: AvatarProps) {
  if (src) {
    return <img src={src} alt={alt} className={`object-cover rounded-full flex-shrink-0 ${className}`} />;
  }

  // Default Facebook/Instagram style silhouettes
  const maleSilhouette = (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#94A3B8] bg-[#1A1C23]">
      <circle cx="50" cy="35" r="20" fill="currentColor" />
      <path d="M50 60C30 60 15 75 15 95H85C85 75 70 60 50 60Z" fill="currentColor" />
    </svg>
  );

  const femaleSilhouette = (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#94A3B8] bg-[#1A1C23]">
      <circle cx="50" cy="35" r="18" fill="currentColor" />
      <path d="M50 55C35 55 25 65 20 95H80C75 65 65 55 50 55Z" fill="currentColor" />
      <path d="M35 30C35 20 40 15 50 15C60 15 65 20 65 30C65 45 70 50 70 60H30C30 50 35 45 35 30Z" fill="currentColor" />
    </svg>
  );

  const defaultSilhouette = (
    <div className="w-full h-full flex items-center justify-center bg-[#1A1C23] text-[#94A3B8]">
      <User size="60%" weight="fill" />
    </div>
  );

  return (
    <div className={`overflow-hidden rounded-full flex-shrink-0 ${className}`}>
      {gender === "male" 
        ? maleSilhouette 
        : gender === "female" 
          ? femaleSilhouette 
          : defaultSilhouette}
    </div>
  );
}
