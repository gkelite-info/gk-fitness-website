import { Clock, ShareNetwork, InstagramLogo, FacebookLogo, GoogleLogo, Globe } from "@phosphor-icons/react";

export const getCategoryBadge = (category: string) => {
  switch (category) {
    case "Warm":
      return (
        <div className="flex items-center px-3 py-1.5 gap-1.5 bg-[#2A1D08] border border-amber-500/30 rounded-lg whitespace-nowrap">
          <div className="w-3.5 h-3.5 bg-amber-400 flex items-center justify-center mask mask-star-2" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
          <span className="font-sans font-semibold text-xs text-amber-400">{category}</span>
        </div>
      );
    case "Hot":
      return (
        <div className="flex items-center px-3 py-1.5 gap-1.5 bg-[#321317] border border-red-500/30 rounded-lg whitespace-nowrap">
          <div className="w-3.5 h-3.5 bg-red-400 flex items-center justify-center mask mask-star-2" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
          <span className="font-sans font-semibold text-xs text-red-400">{category}</span>
        </div>
      );
    case "Cold":
      return (
        <div className="flex items-center px-3 py-1.5 gap-1.5 bg-[#0C2433] border border-sky-500/30 rounded-lg whitespace-nowrap">
          <div className="w-3.5 h-3.5 bg-sky-400 flex items-center justify-center mask mask-star-2" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
          <span className="font-sans font-semibold text-xs text-sky-400">{category}</span>
        </div>
      );
    default:
      return (
        <div className="flex items-center px-3 py-1.5 gap-1.5 bg-[#1C2631] border border-slate-500/30 rounded-lg whitespace-nowrap">
          <span className="font-sans font-semibold text-xs text-slate-400">{category}</span>
        </div>
      );
  }
};

export const getStatusBadge = (status: string) => {
  return (
    <div className="flex items-center px-3 py-1.5 gap-1.5 bg-[#231E0C] border border-yellow-500/30 rounded-lg whitespace-nowrap">
      <Clock size={14} weight="bold" className="text-yellow-400" />
      <span className="font-sans font-semibold text-xs text-yellow-400">{status}</span>
    </div>
  );
};

export const getAddedViaBadge = (addedVia: string) => {
  return (
    <div className="flex items-center px-3 py-1.5 gap-1.5 bg-[#0C2419] border border-emerald-500/30 rounded-lg whitespace-nowrap">
      <ShareNetwork size={14} weight="bold" className="text-emerald-400" />
      <span className="font-sans font-medium text-xs text-emerald-400">{addedVia}</span>
    </div>
  );
};

export const getSourceBadge = (source: string) => {
  const sourceLower = source.toLowerCase();
  
  if (sourceLower.includes("instagram")) {
    return (
      <div className="flex items-center px-3 py-1.5 gap-1.5 bg-[#2A1329] border border-fuchsia-500/30 rounded-lg whitespace-nowrap">
        <InstagramLogo size={14} weight="bold" className="text-fuchsia-400" />
        <span className="font-sans font-medium text-xs text-fuchsia-400">{source}</span>
      </div>
    );
  }
  
  if (sourceLower.includes("facebook")) {
    return (
      <div className="flex items-center px-3 py-1.5 gap-1.5 bg-[#13203A] border border-blue-500/30 rounded-lg whitespace-nowrap">
        <FacebookLogo size={14} weight="bold" className="text-blue-400" />
        <span className="font-sans font-medium text-xs text-blue-400">{source}</span>
      </div>
    );
  }
  
  if (sourceLower.includes("google")) {
    return (
      <div className="flex items-center px-3 py-1.5 gap-1.5 bg-[#201010] border border-red-500/30 rounded-lg whitespace-nowrap">
        <GoogleLogo size={14} weight="bold" className="text-red-400" />
        <span className="font-sans font-medium text-xs text-red-400">{source}</span>
      </div>
    );
  }
  
  // Default fallback for other sources
  return (
    <div className="flex items-center px-3 py-1.5 gap-1.5 bg-[#1C2631] border border-slate-500/30 rounded-lg whitespace-nowrap">
      <Globe size={14} weight="bold" className="text-slate-400" />
      <span className="font-sans font-medium text-xs text-slate-400">{source}</span>
    </div>
  );
};
