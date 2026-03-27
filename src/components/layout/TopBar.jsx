import React from 'react';
import SearchBar from '../filters/SearchBar';

export default function TopBar({ search, onSearch, onNearMe }) {
  return (
    <header className="h-[80px] bg-mint flex items-center justify-between px-8 z-20 flex-shrink-0 relative w-full font-sans">
      
      <div className="flex items-center w-[220px] lg:w-[260px] flex-shrink-0">
        <h1 className="text-[22px] font-bold text-primary flex items-center gap-1.5 tracking-tight">
          Verdant Halal
        </h1>
      </div>

      <div className="hidden md:flex items-center gap-8 h-full">
        <button className="h-full border-b-[3px] border-primary text-primary font-bold text-sm px-1 pt-1">
          Discover
        </button>
        <button className="h-full border-b-[3px] border-transparent text-[#6cd199] hover:text-primary font-bold text-sm px-1 pt-1 transition-colors">
          Favorites
        </button>
        <button className="h-full border-b-[3px] border-transparent text-[#6cd199] hover:text-primary font-bold text-sm px-1 pt-1 transition-colors">
          Recent
        </button>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <div className="w-[280px] hidden lg:block">
          <SearchBar value={search} onChange={onSearch} />
        </div>
        
        <button 
          onClick={onNearMe}
          className="flex items-center justify-center px-4 py-2 bg-primary text-white hover:bg-primary-light font-bold text-sm rounded-full transition-colors shrink-0 shadow-sm leading-none"
        >
          <svg className="w-3.5 h-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
          Near Me
        </button>
        
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-primary shadow-sm shrink-0 cursor-pointer text-primary hover:bg-mint transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>
    </header>
  );
}
