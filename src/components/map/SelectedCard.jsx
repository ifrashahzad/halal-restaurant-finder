import React from 'react';
import { getDistanceKm } from '../../utils/distanceCalc';

export default function SelectedCard({ restaurant, onClose, onViewDetail, userLocation }) {
  if (!restaurant) return null;

  let dist = restaurant.distance;
  if (!dist && restaurant.latitude && restaurant.longitude) {
    const lat = userLocation ? userLocation.lat : 60.1699;
    const lng = userLocation ? userLocation.lng : 24.9384;
    dist = getDistanceKm(lat, lng, restaurant.latitude, restaurant.longitude);
  }

  const distanceStr = dist ? dist.toFixed(1) : null;
  const timeTaken = dist ? Math.max(1, Math.ceil((dist / 30) * 60)) : null;
  const mapUrl = `https://maps.google.com/?daddr=${restaurant.latitude},${restaurant.longitude}`;

  return (
    <div
      className="absolute top-6 left-6 z-[400] w-[300px] bg-[#f0f3f1] rounded-[24px] shadow-2xl overflow-hidden font-sans cursor-pointer"
      onClick={() => onViewDetail(restaurant)}
    >
      {/* Header row: icon + title + close */}
      <div className="flex items-center gap-3 px-5 pt-5 pb-4">
        <div className="w-12 h-12 bg-[#133924] rounded-[14px] flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>

        <div className="flex-1 min-w-0 pr-2">
          <p className="text-[9px] font-extrabold tracking-widest uppercase text-[#6b9e7e] mb-0.5">Selected Result</p>
          <h3 className="text-[18px] font-extrabold text-[#0a2114] leading-tight truncate">{restaurant.name}</h3>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="w-8 h-8 bg-[#133924] text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm hover:bg-[#1c5e38] transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Info rows */}
      <div className="px-5 pb-4 space-y-3 text-[13px] font-semibold text-[#3a5a44]">
        {restaurant.hours && (
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 flex-shrink-0 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="truncate">{restaurant.hours}</span>
          </div>
        )}

        {restaurant.phone && (
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 flex-shrink-0 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>+358 {restaurant.phone}</span>
          </div>
        )}

        {distanceStr && (
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 flex-shrink-0 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span className="font-bold text-[#0a2114]">{timeTaken} min <span className="text-[#8ba394] font-normal mx-1">•</span> {distanceStr} km</span>
          </div>
        )}
      </div>

      {/* Get Directions button */}
      <div className="px-5 pb-5">
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="w-full flex justify-center items-center gap-2 py-3.5 bg-[#133924] hover:bg-[#1c5e38] text-white font-bold text-[14px] rounded-[14px] transition-colors shadow-lg shadow-primary/30"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Get Directions
        </a>
      </div>
    </div>
  );
}
