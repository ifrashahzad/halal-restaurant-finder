import HalalBadge from './HalalBadge';
import { getSeededProps, getDisplayDesc, getImageUrl } from '../../utils/restaurantProps';

export default function RestaurantCard({ restaurant, onClick, isSelected, userLocation }) {
  const { rating, distanceFake, tag, prefix, isSpecialty } = getSeededProps(restaurant.name || 'default');

  const displayDistance = restaurant.distance ? restaurant.distance.toFixed(1) : distanceFake;
  const displayDesc = getDisplayDesc(restaurant.cuisine, prefix, isSpecialty);
  const imageUrl = getImageUrl(restaurant, '400x200');

  return (
    <article
      onClick={() => onClick(restaurant)}
      className={`relative flex-shrink-0 bg-[#f8fbf9] rounded-[20px] shadow-sm overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-200 border-2 ${isSelected ? 'border-primary' : 'border-transparent hover:border-[#dbe6df]'}`}
    >
      <div className="relative h-44 w-full bg-gray-200 overflow-hidden">
        <img
          src={imageUrl}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <HalalBadge status={restaurant.halal_status} />
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-1.5">
          <h3 className="font-extrabold text-xl text-[#0a2114] leading-tight truncate pr-4">
            {restaurant.name}
          </h3>
          <div className="flex items-center bg-[#cce8d6] text-primary px-2 py-0.5 rounded-lg flex-shrink-0">
            <svg className="w-3.5 h-3.5 mr-1 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-[13px] font-bold">{rating}</span>
          </div>
        </div>

        <p className="text-sm text-[#4a6354] font-medium mb-4">
          {displayDesc}
          <span className="text-[#8ba394]"> • {displayDistance}km away</span>
        </p>

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
      </div>
    </article>
  );
}
