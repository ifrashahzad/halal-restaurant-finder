import HalalBadge from './HalalBadge';
import { getSeededProps, getDisplayDesc, getImageUrl } from '../../utils/restaurantProps';

export default function RestaurantDetail({ restaurant, onClose }) {
  if (!restaurant) return null;

  const { rating, reviewsCount, tag, prefix, isSpecialty, distanceFake } = getSeededProps(restaurant.name || 'default');

  const displayDesc = getDisplayDesc(restaurant.cuisine, prefix, isSpecialty);
  const imageUrl = getImageUrl(restaurant, '600x400');

  const mapUrl = `https://maps.google.com/?q=${restaurant.latitude},${restaurant.longitude}`;

  const parseHours = (hoursStr) => {
    if (!hoursStr) return ['Hours not available'];
    return hoursStr.split(',').map(s => s.trim());
  };
  const hours = parseHours(restaurant.hours);

  return (
    <div className="flex flex-col h-full bg-white relative z-50 overflow-y-auto pb-10" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>

      <div className="relative h-[360px] w-full bg-gray-200 flex-shrink-0">
        <img src={imageUrl} alt={restaurant.name} className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/5 to-transparent" />

        <button
          onClick={onClose}
          className="absolute top-6 left-6 p-2.5 bg-[#e4ede8]/90 backdrop-blur-sm hover:bg-white rounded-full shadow-sm transition-colors text-primary border border-white/50 z-50"
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      </div>

      <div className="px-8 -mt-20 relative z-10 flex-1">

        {/* Halal badge + rating — same style as RestaurantCard */}
        <div className="flex items-center gap-3 mb-4">
          <HalalBadge status={restaurant.halal_status} />
          <div className="flex items-center bg-[#cce8d6] text-primary px-2 py-0.5 rounded-lg">
            <svg className="w-3.5 h-3.5 mr-1 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-[13px] font-bold">{rating}</span>
            <span className="text-[13px] text-primary/70 font-semibold ml-1.5">({reviewsCount} reviews)</span>
          </div>
        </div>

        <h2 className="text-[44px] font-extrabold text-[#0a2114] leading-[1.05] tracking-tight mb-3 pr-10">
          {restaurant.name}
        </h2>

        {/* Description + tags — exact same output as RestaurantCard */}
        <p className="text-sm text-[#4a6354] font-medium mb-3">
          {displayDesc}
        </p>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            {restaurant.cuisine && (
              <span className="px-2.5 py-1 bg-[#e4ede8] text-[#3b8c5e] text-[10px] font-extrabold uppercase tracking-wide rounded border border-[#d1ebd9]">
                {restaurant.cuisine}
              </span>
            )}
            <span className="px-2.5 py-1 bg-[#f0f3f1] text-[#6b7280] text-[10px] font-extrabold uppercase tracking-wide rounded border border-[#e5e7eb]">
              {tag}
            </span>
          </div>
          <div className="flex gap-2.5">
            <button className="w-11 h-11 bg-primary text-white rounded-[14px] flex items-center justify-center shadow-lg shadow-primary/20 transition-transform active:scale-95 hover:bg-primary-light">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
            </button>
            <button className="w-11 h-11 bg-[#e4ede8] hover:bg-[#d1ebd9] text-[#0a2114] rounded-[14px] flex items-center justify-center transition-colors active:scale-95">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="bg-mint rounded-[24px] p-6 flex flex-col">
            <h3 className="text-[10px] font-extrabold text-[#6cd199] tracking-widest uppercase mb-4">Location</h3>
            <p className="text-[15px] text-[#0a2114] font-bold leading-relaxed mb-6 flex-1 pr-6">
              {restaurant.address},<br />
              {restaurant.city},<br />
              Finland
            </p>
            <div className="flex gap-2.5">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-primary hover:bg-primary-light text-white text-[13px] font-bold py-3.5 rounded-[14px] flex items-center justify-center transition-colors shadow-lg shadow-primary/20"
              >
                Open in Maps
              </a>
            </div>
          </div>

          <div className="bg-mint rounded-[24px] p-6">
            <h3 className="text-[10px] font-extrabold text-[#6cd199] tracking-widest uppercase mb-4">Opening Hours</h3>
            <ul className="space-y-3 text-[13px] text-[#0a2114] font-bold mb-4">
              {hours.map((h, i) => (
                <li key={i} className="flex justify-between items-center py-1 border-b border-[#d5e9dc] last:border-0">
                  <span className="text-[#4a6354] font-semibold">Mon – Sun</span>
                  <span className="font-bold">{h.trim()}</span>
                </li>
              ))}
            </ul>

            {(restaurant.phone || restaurant.website) && (
              <div className="pt-4 border-t border-[#d5e9dc] flex flex-col gap-3 text-[13px] font-bold">
                {restaurant.phone && (
                  <a href={`tel:${restaurant.phone}`} className="flex items-center text-[#0a2114] hover:text-primary transition-colors">
                    <svg className="w-[16px] h-[16px] mr-2 text-primary opacity-80 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {restaurant.phone}
                  </a>
                )}
                {restaurant.website && (
                  <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-[#0a2114] hover:text-primary transition-colors truncate">
                    <svg className="w-[16px] h-[16px] mr-2 text-primary opacity-80 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    Visit Website
                  </a>
                )}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
