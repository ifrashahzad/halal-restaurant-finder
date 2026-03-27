import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import RestaurantMarker from './RestaurantMarker';
import SelectedCard from './SelectedCard';
import { FINLAND_CENTER, DEFAULT_ZOOM } from '../../constants';

// Component to handle map selection centering
function MapController({ selectedRestaurant }) {
  const map = useMap();

  useEffect(() => {
    if (selectedRestaurant) {
      map.flyTo(
        [selectedRestaurant.latitude, selectedRestaurant.longitude],
        13,
        { duration: 1.5 }
      );
    }
  }, [selectedRestaurant, map]);

  return null;
}

export default function MapView({ restaurants, selectedRestaurant, onSelectRestaurant, onViewDetail, userLocation }) {
  const [hoveredRestaurant, setHoveredRestaurant] = React.useState(null);

  // Eliminate stale ghost popups instantly when user swaps Filter Categories ("Bangladeshi" vs "All")!
  React.useEffect(() => {
    setHoveredRestaurant(null);
  }, [restaurants]);

  const userIcon = L.divIcon({
    className: 'user-location-marker',
    html: `
      <div style="
        width: 16px;
        height: 16px;
        background-color: #3b82f6;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.6);
      "></div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });

  return (
    <div className="relative w-full h-full z-0 font-sans">
      <MapContainer
        center={FINLAND_CENTER}
        zoom={DEFAULT_ZOOM}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          className="map-tiles"
        />

        <ZoomControl position="bottomright" />


        <div className="absolute bottom-[24px] right-[24px] z-[1000]">
          <button
            onClick={(e) => { e.preventDefault(); if (userLocation) { window.dispatchEvent(new CustomEvent('near-me')); } }}
            className="w-[44px] h-[44px] bg-[#133924] text-white rounded-[14px] flex items-center justify-center shadow-lg border border-[#1c4f34] transition-transform hover:bg-[#1c4f34] active:scale-95 cursor-pointer map-locate-btn"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" />
            </svg>
          </button>
        </div>

        <MapController selectedRestaurant={selectedRestaurant} />

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>Your Location</Popup>
          </Marker>
        )}

        {restaurants.map(r => (
          <RestaurantMarker
            key={r.id}
            restaurant={r}
            onSelect={onSelectRestaurant}
            isHover={setHoveredRestaurant}
            isSelected={selectedRestaurant?.id === r.id}
          />
        ))}
      </MapContainer>

      {/* Hover popup on map — compact SelectedCard */}
      {hoveredRestaurant && (
        <SelectedCard
          restaurant={hoveredRestaurant}
          onClose={() => setHoveredRestaurant(null)}
          onViewDetail={(r) => { setHoveredRestaurant(null); onViewDetail(r); }}
          userLocation={userLocation}
        />
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        .leaflet-container {
          background: #737b76;
        }
        /* Make CartoDB dark slightly greenish grey to match image */
        .map-tiles {
          filter: brightness(1.7) contrast(0.85) sepia(0.2) hue-rotate(90deg) saturate(0.2);
        }
        /* Styling leaflet controls to match mockup */
        .leaflet-bottom.leaflet-right {
          margin-bottom: 84px;
          margin-right: 24px;
        }
        .leaflet-touch .leaflet-control-zoom-in, .leaflet-touch .leaflet-control-zoom-out {
          width: 44px !important;
          height: 44px !important;
          line-height: 44px !important;
          color: #0a2114;
          background: white;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .leaflet-bar {
          border: none !important;
          box-shadow: 0 4px 14px rgba(0,0,0,0.1) !important;
          border-radius: 14px !important;
          overflow: hidden;
          width: 44px !important;
          margin: 0 !important;
        }
        .leaflet-control-zoom-in { border-bottom: 1px solid #e4ede8 !important; }
      `}} />
    </div>
  );
}
