'use client';

import { createContext, useContext, useState } from 'react';

type FilterContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
};

export const FilterContext = createContext<FilterContextType>({
  searchQuery: '',
  setSearchQuery: () => {},
  activeFilter: 'All',
  setActiveFilter: () => {},
});

export default function SearchAndFilter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <FilterContext.Provider value={{ searchQuery, setSearchQuery, activeFilter, setActiveFilter }}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search services by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 bg-gray-900 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-colors"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          {['All', 'AI Services', 'Workflow'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-orange-400 text-black'
                  : 'bg-transparent border border-gray-700 text-white hover:border-orange-400'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </FilterContext.Provider>
  );
}
