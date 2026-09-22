"use client";

import React from 'react';
import Link from 'next/link';

export interface FinanceKPICardProps {
  title: string;
  value: string;
  trend: string;
  trendSuffix: string;
  trendColor: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconBorderColor: string;
  iconColor: string;
  href?: string;
}

export default function FinanceKPICard({
  title,
  value,
  trend,
  trendSuffix,
  trendColor,
  icon,
  iconBgColor,
  iconBorderColor,
  iconColor,
  href
}: FinanceKPICardProps) {
  const content = (
    <>
      <div 
        className="flex justify-center items-center w-12 h-12 rounded-[16px] shrink-0"
        style={{ 
          backgroundColor: iconBgColor,
          borderColor: iconBorderColor,
          borderWidth: '1px'
        }}
      >
        <div style={{ color: iconColor }}>
          {icon}
        </div>
      </div>
      <div className="flex flex-col items-start gap-0.5">
        <span className="font-[500] text-[12px] leading-[16px] text-[#94A3B8] whitespace-nowrap">
          {title}
        </span>
        <span className="font-[700] text-[24px] leading-[32px] tracking-[-0.6px] text-white break-words">
          {value}
        </span>
        <div className="flex flex-row items-center gap-1 mt-0.5">
          <span 
            className="font-[600] text-[11px] leading-[16px]"
            style={{ color: trendColor }}
          >
            {trend}
          </span>
          <span className="font-[400] text-[11px] leading-[16px] text-[#94A3B8] whitespace-nowrap">
            {trendSuffix}
          </span>
        </div>
      </div>
    </>
  );

  const containerClasses = `flex flex-row items-center p-5 gap-4 w-full bg-[#111418] border border-[#1D222B] rounded-[16px] ${href ? 'cursor-pointer hover:border-[#334155] hover:bg-[#1A1F26] transition-all' : ''}`;

  if (href) {
    return (
      <Link href={href} className={containerClasses}>
        {content}
      </Link>
    );
  }

  return (
    <div className={containerClasses}>
      {content}
    </div>
  );
}
