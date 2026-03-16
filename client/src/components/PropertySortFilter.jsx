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
    <div className="mx-auto mb-6 flex max-w-3xl flex-col gap-4 rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex w-full flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center">
        <div className="flex w-full items-center gap-2 lg:w-auto">
          <FaSort className="text-gray-400" />
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-green-500 sm:text-base lg:w-auto lg:min-w-[220px] lg:flex-none"
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
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm transition-colors hover:bg-gray-50 disabled:opacity-60 sm:text-base lg:w-auto"
        >
          <FaCrosshairs />
          <span>{isLocating ? t('propertiesPage.locating', 'Locating...') : t('propertiesPage.nearMe', 'Near Me')}</span>
        </button>

        <button
          onClick={onAdvancedFiltersOpen}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm transition-colors hover:bg-gray-50 sm:text-base lg:w-auto"
        >
          <FaFilter />
          <span>{t('propertiesPage.advancedFilters', 'Advanced Filters')}</span>
        </button>
      </div>

      <div className="flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg border border-gray-300 lg:w-auto lg:justify-end">
        <button
          onClick={() => onViewChange('grid')}
          className={`w-full px-4 py-2 lg:w-auto ${currentView === 'grid' ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          title={t('propertiesPage.gridView', 'Grid View')}
        >
          <FaMap />
        </button>
      </div>
    </div>
  );
}
