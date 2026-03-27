import { Marker } from 'react-leaflet';
import L from 'leaflet';

function makePin(isSelected) {
  const bg = isSelected ? '#133924' : '#1c5e38';
  const size = isSelected ? 44 : 36;
  const iconSize = isSelected ? 20 : 16;
  const shadow = isSelected ? '0 4px 18px rgba(19,57,36,0.55)' : '0 3px 10px rgba(0,0,0,0.28)';
  const ring = isSelected ? 'border: 3px solid rgba(255,255,255,0.9);' : 'border: 2px solid rgba(255,255,255,0.7);';

  return `
    <div style="
      width: ${size}px;
      height: ${size}px;
      background: ${bg};
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: ${shadow};
      ${ring}
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <svg
        style="transform: rotate(45deg); width: ${iconSize}px; height: ${iconSize}px;"
        fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2.5"
      >
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    </div>
  `;
}

export default function RestaurantMarker({ restaurant, onSelect, isHover, isSelected }) {
  const size    = isSelected ? 44 : 36;
  const anchor  = isSelected ? [22, 44] : [18, 36];

  const icon = L.divIcon({
    className: 'custom-pin-marker',
    html: makePin(isSelected),
    iconSize: [size, size],
    iconAnchor: anchor,
  });

  const handlers = {
    click:     () => onSelect(restaurant),
    mouseover: () => isHover && isHover(restaurant),
  };

  return (
    <Marker
      position={[restaurant.latitude, restaurant.longitude]}
      icon={icon}
      zIndexOffset={isSelected ? 100 : 0}
      eventHandlers={handlers}
    />
  );
}
