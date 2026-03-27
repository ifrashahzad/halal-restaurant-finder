import React from 'react';
import RestaurantCard from './RestaurantCard';

export default function RestaurantList({ restaurants, onSelect, selectedId, userLocation }) {
  if (restaurants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-[#6cd199] text-center">
        <svg className="w-12 h-12 mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p className="font-bold">No restaurants match your search</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 overflow-y-auto h-full pb-24 pr-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {restaurants.map((restaurant) => (
        <RestaurantCard 
          key={restaurant.id} 
          restaurant={restaurant} 
          onClick={onSelect}
          isSelected={selectedId === restaurant.id}
          userLocation={userLocation}
        />
      ))}
    </div>
  );
}
