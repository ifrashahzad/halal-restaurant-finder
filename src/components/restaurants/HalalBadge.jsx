import React from 'react';

export default function HalalBadge({ status }) {
  const isVerified = status && (status.toLowerCase().includes('verified') || status.toLowerCase().includes('fully'));
  
  if (isVerified) {
    return (
      <div className="inline-flex items-center px-2.5 py-1.5 rounded-lg text-[10px] font-extrabold tracking-wide leading-none bg-[#0a2114] text-white shadow-md backdrop-blur-sm bg-opacity-90 border border-white/10 uppercase">
        <svg className="w-3 h-3 mr-1.5 text-[#6cd199]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
        VERIFIED HALAL
      </div>
    );
  }

  return (
    <div className="inline-flex items-center px-2.5 py-1.5 rounded-lg text-[10px] font-extrabold tracking-wide leading-none bg-yellow-500 text-[#0a2114] shadow-md backdrop-blur-sm bg-opacity-90 border border-white/10 uppercase">
      <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      HALAL OPTIONS
    </div>
  );
}
