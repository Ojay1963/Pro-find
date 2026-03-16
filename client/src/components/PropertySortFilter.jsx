import React, { useEffect, useState } from 'react';
import { FaSort, FaFilter, FaMap, FaCrosshairs } from 'react-icons/fa';
import { useI18n } from '../contexts/I18nContext';

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
  const { t } = useI18n();
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
    <div className="mx-auto mb-6 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <FaSort className="text-gray-400" />
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="relevance">{t('propertiesPage.sort.relevance', 'Sort by: Relevance')}</option>
            <option value="price-low">{t('propertiesPage.sort.priceLow', 'Price: Low to High')}</option>
            <option value="price-high">{t('propertiesPage.sort.priceHigh', 'Price: High to Low')}</option>
            <option value="date-new">{t('propertiesPage.sort.dateNew', 'Date: Newest First')}</option>
            <option value="date-old">{t('propertiesPage.sort.dateOld', 'Date: Oldest First')}</option>
            {canSortByDistance ? <option value="nearest">{t('propertiesPage.sort.nearest', 'Distance: Nearest First')}</option> : null}
            <option value="popularity">{t('propertiesPage.sort.popularity', 'Most Popular')}</option>
          </select>
        </div>

        <button
          type="button"
          onClick={onUseCurrentLocation}
          disabled={!onUseCurrentLocation || isLocating}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-60"
        >
          <FaCrosshairs />
          <span>{isLocating ? t('propertiesPage.locating', 'Locating...') : t('propertiesPage.nearMe', 'Near Me')}</span>
        </button>

        <button
          onClick={onAdvancedFiltersOpen}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FaFilter />
          <span>{t('propertiesPage.advancedFilters', 'Advanced Filters')}</span>
        </button>
      </div>

      <div className="flex items-center gap-2 border border-gray-300 rounded-lg overflow-hidden">
        <button
          onClick={() => onViewChange('grid')}
          className={`p-2 ${currentView === 'grid' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          title={t('propertiesPage.gridView', 'Grid View')}
        >
          <FaMap />
        </button>
      </div>
    </div>
  );
}
