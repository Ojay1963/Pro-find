import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeaturedProperties from '../components/FeaturedProperties';
import PropertiesSearchBar from '../components/PropertiesSearchBar';
import PropertySortFilter from '../components/PropertySortFilter';
import AdvancedFilters from '../components/AdvancedFilters';
import { SearchContext } from '../contexts/SearchContext.jsx';
import { FaMap } from 'react-icons/fa';

export default function Properties() {
  const [advancedFilters, setAdvancedFilters] = useState({});
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
    // Sort logic would be applied in FeaturedProperties component
  };

  const handleAdvancedFilterChange = (filters) => {
    setAdvancedFilters(filters);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 mt-24 py-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Properties</h1>
          <Link
            to="/properties/map"
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FaMap />
            <span>Map View</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <PropertiesSearchBar />
        <PropertySortFilter
          onSortChange={handleSortChange}
          onViewChange={setViewMode}
          currentView={viewMode}
          onAdvancedFiltersOpen={() => setShowAdvancedFilters(true)}
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        <FeaturedProperties
          showAll
          sortBy={sortBy}
          viewMode={viewMode}
          advancedFilters={advancedFilters}
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
