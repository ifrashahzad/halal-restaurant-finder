export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        className="block w-full pl-6 pr-12 py-3 bg-[#eef5f0] border-transparent rounded-[16px] text-[15px] font-bold text-[#0a2114] placeholder-[#8ba394] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-colors"
        placeholder="Search Helsinki..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button 
        className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-primary hover:text-primary-light transition-colors"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-10 pr-2 flex items-center text-[#8ba394] hover:text-[#0a2114] focus:outline-none"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
