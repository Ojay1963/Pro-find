import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeaturedProperties from '../components/FeaturedProperties';
import PropertiesSearchBar from '../components/PropertiesSearchBar';
import PropertySortFilter from '../components/PropertySortFilter';
import AdvancedFilters from '../components/AdvancedFilters';
import { FaCrosshairs, FaMap } from 'react-icons/fa';
import { useI18n } from '../contexts/I18nContext';
import { SearchContext } from '../contexts/SearchContext';

export default function Properties() {
  const { t } = useI18n();
  const { setSearch } = useContext(SearchContext);
  const [searchParams] = useSearchParams();
  const [advancedFilters, setAdvancedFilters] = useState({});
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const hasActiveLocation = Array.isArray(userLocation) && userLocation.length === 2;

  useEffect(() => {
    setSearch({
      location: searchParams.get('location') || '',
      type: searchParams.get('type') || 'All Types',
      status: searchParams.get('status') || 'Buy',
      beds: searchParams.get('beds') || '',
      min: searchParams.get('min') || '',
      max: searchParams.get('max') || ''
    });
  }, [searchParams, setSearch]);

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
      setLocationError(t('propertiesPage.errors.geoUnsupported', 'Geolocation is not supported in this browser.'));
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
        setLocationError(error.message || t('propertiesPage.errors.geoUnavailable', 'Unable to access your location.'));
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
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-5 shadow-sm md:rounded-3xl md:p-6">
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-emerald-600">
                {t('propertiesPage.badge', 'Explore')}
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">{t('propertiesPage.title', 'Properties')}</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                {hasActiveLocation
                  ? t('propertiesPage.mobileLeadNearby', 'Nearby homes are now prioritized so you can browse like a location-aware app feed.')
                  : t('propertiesPage.mobileLead', 'Browse, switch to map view, and refine listings with a mobile-first discovery flow.')}
              </p>
            </div>
            <div className="hidden rounded-2xl border border-white/80 bg-white/80 px-4 py-3 text-right shadow-sm md:block">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{t('propertiesPage.statusLabel', 'Session')}</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {hasActiveLocation ? t('propertiesPage.statusNearby', 'Nearby mode on') : t('propertiesPage.statusReady', 'Ready to explore')}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:w-auto">
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={isLocating}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-green-200 bg-white/80 px-4 py-3 text-green-700 transition-colors hover:bg-green-50 disabled:opacity-60 sm:w-auto"
            >
              <FaCrosshairs />
              <span>{isLocating ? t('propertiesPage.findingNearby', 'Finding nearby properties...') : t('propertiesPage.useMyLocation', 'Use my location')}</span>
            </button>
            <Link
              to="/properties/map"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 px-4 py-3 text-white transition-colors hover:bg-green-700 sm:w-auto"
            >
              <FaMap />
              <span>{t('propertiesPage.mapView', 'Map View')}</span>
            </Link>
          </div>

          {locationError ? <p className="mt-4 text-sm text-red-600">{locationError}</p> : null}
          {hasActiveLocation ? <p className="mt-4 text-sm text-green-700">{t('propertiesPage.showingClosest', 'Showing the closest properties first.')}</p> : null}
        </div>

        {!hasActiveLocation ? (
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">{t('propertiesPage.cards.savedSearchesTitle', 'Saved searches')}</p>
              <p className="mt-2 text-sm text-gray-700">{t('propertiesPage.cards.savedSearchesText', 'Use the search bar to save high-intent filters and revisit them later.')}</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">{t('propertiesPage.cards.mapListTitle', 'Map + list')}</p>
              <p className="mt-2 text-sm text-gray-700">{t('propertiesPage.cards.mapListText', 'Switch between list and map views without losing your search context.')}</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">{t('propertiesPage.cards.nearMeTitle', 'Near me')}</p>
              <p className="mt-2 text-sm text-gray-700">{t('propertiesPage.cards.nearMeText', 'Allow browser location to sort by distance and highlight nearby opportunities.')}</p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="container mx-auto px-4 py-2 md:py-4">
        <div className="properties-mobile-filter-panel rounded-[1.75rem] border border-gray-200 bg-white/90 p-3 shadow-sm backdrop-blur md:rounded-3xl md:p-4">
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
