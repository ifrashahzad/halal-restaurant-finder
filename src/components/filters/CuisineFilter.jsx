import { CUISINE_TYPES } from '../../constants';

export default function CuisineFilter({ active, onChange }) {
  
  const displayTypes = ['Turkish', 'Arab', 'Pakistani', 'Open Now'];
  
  
  return (
    <div>
      <h2 className="text-[28px] md:text-3xl font-extrabold text-[#0a2114] mb-5 tracking-tight">
        Top Halal Restaurants
      </h2>
      <div className="flex overflow-x-auto gap-2.5 pb-2 -mx-2 px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {CUISINE_TYPES.map((cuisine) => {
          const isActive = active === cuisine;
          return (
            <button
              key={cuisine}
              onClick={() => onChange(active === cuisine ? 'All' : cuisine)}
              className={`flex-shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-bold transition-all ${
                isActive 
                  ? 'bg-primary text-white shadow-md shadow-primary/20' 
                  : 'bg-[#e4ede8] text-[#4a6354] hover:bg-[#d1ebd9]'
              }`}
            >
              {cuisine}
            </button>
          );
        })}
      </div>
    </div>
  );
}
