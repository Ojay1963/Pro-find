import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeaturedProperties from '../components/FeaturedProperties';
import PropertiesSearchBar from '../components/PropertiesSearchBar';
import PropertySortFilter from '../components/PropertySortFilter';
import AdvancedFilters from '../components/AdvancedFilters';
import { FaCrosshairs, FaMap } from 'react-icons/fa';
import { useI18n } from '../contexts/I18nContext';

export default function Properties() {
  const { t } = useI18n();
  const [advancedFilters, setAdvancedFilters] = useState({});
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const hasActiveLocation = Array.isArray(userLocation) && userLocation.length === 2;

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
  };

  const handleAdvancedFilterChange = (filters) => {
    setAdvancedFilters(filters);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setUserLocation(null);
      setSortBy('relevance');
      setLocationError('Geolocation is not supported in this browser.');
      return;
    }

    setIsLocating(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const nextCoords = [coords.latitude, coords.longitude];
        setUserLocation(nextCoords);
        setSortBy('nearest');
        setLocationError('');
        setIsLocating(false);
      },
      (error) => {
        setUserLocation(null);
        if (sortBy === 'nearest') {
          setSortBy('relevance');
        }
        setLocationError(error.message || 'Unable to access your location.');
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 mt-24 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
          <h1 className="text-3xl font-bold">{t('propertiesPage.title', 'Properties')}</h1>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={isLocating}
              className="flex items-center gap-2 px-4 py-2 border border-green-200 text-green-700 rounded-lg hover:bg-green-50 transition-colors disabled:opacity-60"
            >
              <FaCrosshairs />
              <span>{isLocating ? 'Finding nearby properties...' : 'Use my location'}</span>
            </button>
            <Link
              to="/properties/map"
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FaMap />
              <span>{t('propertiesPage.mapView', 'Map View')}</span>
            </Link>
          </div>
        </div>
        {locationError ? <p className="text-sm text-red-600">{locationError}</p> : null}
        {hasActiveLocation ? <p className="text-sm text-green-700">Showing the closest properties first.</p> : null}
        {!hasActiveLocation ? (
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Saved searches</p>
              <p className="mt-2 text-sm text-gray-700">Use the search bar to save high-intent filters and revisit them later.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Map + list</p>
              <p className="mt-2 text-sm text-gray-700">Switch between list and map views without losing your search context.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Near me</p>
              <p className="mt-2 text-sm text-gray-700">Allow browser location to sort by distance and highlight nearby opportunities.</p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="container mx-auto px-4 py-4">
        <PropertiesSearchBar />
        <PropertySortFilter
          onSortChange={handleSortChange}
          onViewChange={setViewMode}
          currentView={viewMode}
          currentSortBy={sortBy}
          onAdvancedFiltersOpen={() => setShowAdvancedFilters(true)}
          onUseCurrentLocation={handleUseCurrentLocation}
          canSortByDistance={hasActiveLocation}
          isLocating={isLocating}
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        <FeaturedProperties
          showAll
          sortBy={sortBy}
          viewMode={viewMode}
          advancedFilters={advancedFilters}
          userLocation={hasActiveLocation ? userLocation : null}
        />
      </div>
      <Footer />
      <AdvancedFilters
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        onFilterChange={handleAdvancedFilterChange}
      />
    </div>
  );
}
