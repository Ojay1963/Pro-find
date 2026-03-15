import React, { useEffect, useState } from 'react';
import { FaSort, FaFilter, FaList, FaMap, FaCrosshairs } from 'react-icons/fa';

export default function PropertySortFilter({
  onSortChange,
  onViewChange,
  currentView,
  currentSortBy = 'relevance',
  onAdvancedFiltersOpen,
  onUseCurrentLocation,
  canSortByDistance = false,
  isLocating = false
}) {
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    setSortBy(currentSortBy);
  }, [currentSortBy]);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    onSortChange(value);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-white rounded-xl shadow-sm p-4 border border-gray-200">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <FaSort className="text-gray-400" />
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="relevance">Sort by: Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="date-new">Date: Newest First</option>
            <option value="date-old">Date: Oldest First</option>
            {canSortByDistance ? <option value="nearest">Distance: Nearest First</option> : null}
            <option value="popularity">Most Popular</option>
          </select>
        </div>

        <button
          type="button"
          onClick={onUseCurrentLocation}
          disabled={!onUseCurrentLocation || isLocating}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-60"
        >
          <FaCrosshairs />
          <span>{isLocating ? 'Locating...' : 'Near Me'}</span>
        </button>

        <button
          onClick={onAdvancedFiltersOpen}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FaFilter />
          <span>Advanced Filters</span>
        </button>
      </div>

      <div className="flex items-center gap-2 border border-gray-300 rounded-lg overflow-hidden">
        <button
          onClick={() => onViewChange('list')}
          className={`p-2 ${currentView === 'list' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          title="List View"
        >
          <FaList />
        </button>
        <button
          onClick={() => onViewChange('grid')}
          className={`p-2 ${currentView === 'grid' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          title="Grid View"
        >
          <FaMap />
        </button>
      </div>
    </div>
  );
}
