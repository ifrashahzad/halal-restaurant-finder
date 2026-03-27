import React from 'react';

export default function Sidebar({ activeView, onViewChange }) {
  return (
    <aside className="w-[260px] lg:w-[280px] h-full bg-[#f4f9f6] flex flex-col hidden md:flex flex-shrink-0 z-10 font-sans px-8 py-8 border-r border-[#e2e8e4]">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#0a2114] leading-tight">
          Nordic Concierge
        </h2>
        <p className="text-[11px] text-[#6cd199] font-bold mt-1 tracking-wide">
          Halal Finder Finland
        </p>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        <button 
          onClick={() => onViewChange('restaurants')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-[15px] transition-colors ${
            activeView === 'restaurants' 
              ? 'bg-[#d1ebd9] text-primary' 
              : 'text-primary hover:bg-[#d1ebd9]/50'
          }`}
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Restaurants
        </button>
        
        <button disabled className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-[15px] text-[#2c8d5c] cursor-not-allowed">
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a2 2 0 002 2h10a2 2 0 002-2V8a1 1 0 00-.504-.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Mosques 
        </button>
        
        <button disabled className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-[15px] text-[#2c8d5c] cursor-not-allowed">
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          Favorites
        </button>

        <button disabled className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-[15px] text-[#2c8d5c] cursor-not-allowed">
           <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          Settings
        </button>
      </nav>

      <div className="mt-auto pt-4">
        <button className="w-full flex justify-center items-center py-3 px-4 bg-primary hover:bg-primary-light text-white font-bold text-sm rounded-[14px] transition-colors shadow-lg shadow-primary/20">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Add Restaurant
        </button>
      </div>
    </aside>
  );
}
