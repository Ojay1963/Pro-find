import React, { useState } from 'react';
import { FaBed, FaBath, FaRulerCombined, FaFilter, FaTimes } from 'react-icons/fa';

export default function AdvancedFilters({ onFilterChange, isOpen, onClose }) {
  const [filters, setFilters] = useState({
    listingType: '', // Buy, Rent, Lease
    propertyType: '', // House, Apartment, etc.
    beds: '',
    baths: '',
    minSize: '',
    maxSize: '',
    amenities: [],
    yearBuilt: '',
    parking: ''
  });

  const amenitiesList = [
    'Swimming Pool', 'Gym', 'Security', 'Parking', 'Garden', 
    'Elevator', 'Air Conditioning', 'Furnished', 'Unfurnished',
    'WiFi', 'Generator', 'Water Supply', '24/7 Security'
  ];

  const handleChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleAmenity = (amenity) => {
    const amenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    const newFilters = { ...filters, amenities };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const cleared = {
      listingType: '',
      propertyType: '',
      beds: '',
      baths: '',
      minSize: '',
      maxSize: '',
      amenities: [],
      yearBuilt: '',
      parking: ''
    };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/55 px-4 pb-0 pt-10 backdrop-blur-[2px] md:items-start md:pb-10 md:pt-20 overflow-y-auto">
      <div className="advanced-filters-sheet w-full max-w-4xl overflow-y-auto rounded-t-[2rem] bg-white shadow-2xl md:max-h-[90vh] md:rounded-[1.75rem]">
        <div className="sticky top-0 flex items-center justify-between border-b bg-white/95 p-4 backdrop-blur">
          <div className="flex items-center gap-2">
            <FaFilter className="text-green-600" />
            <h2 className="text-xl font-bold">Advanced Filters</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <FaTimes className="text-gray-600" />
          </button>
        </div>

        <div className="space-y-6 p-5 md:p-6">
          {/* Listing Type */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Listing Type</label>
            <div className="grid grid-cols-3 gap-3">
              {['Buy', 'Rent', 'Lease'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleChange('listingType', filters.listingType === type ? '' : type)}
                  className={`min-h-[48px] rounded-2xl border-2 p-3 font-medium transition ${
                    filters.listingType === type
                      ? 'border-green-600 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:border-green-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Property Type</label>
            <select
              value={filters.propertyType}
              onChange={(e) => handleChange('propertyType', e.target.value)}
              className="w-full rounded-2xl border border-gray-300 p-3.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Property Types</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Land">Land</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          {/* Beds & Baths */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                <FaBed /> Beds
              </label>
              <select
                value={filters.beds}
                onChange={(e) => handleChange('beds', e.target.value)}
                className="w-full rounded-2xl border border-gray-300 p-3.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
                <option value="6">6+</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
                <FaBath /> Baths
              </label>
              <select
                value={filters.baths}
                onChange={(e) => handleChange('baths', e.target.value)}
                className="w-full rounded-2xl border border-gray-300 p-3.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
          </div>

          {/* Size Range */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
              <FaRulerCombined /> Size (sqm)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Min Size"
                value={filters.minSize}
                onChange={(e) => handleChange('minSize', e.target.value)}
                className="w-full rounded-2xl border border-gray-300 p-3.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Max Size"
                value={filters.maxSize}
                onChange={(e) => handleChange('maxSize', e.target.value)}
                className="w-full rounded-2xl border border-gray-300 p-3.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Year Built & Parking */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Year Built</label>
              <input
                type="number"
                placeholder="e.g. 2020"
                value={filters.yearBuilt}
                onChange={(e) => handleChange('yearBuilt', e.target.value)}
                className="w-full rounded-2xl border border-gray-300 p-3.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Parking Spaces</label>
              <select
                value={filters.parking}
                onChange={(e) => handleChange('parking', e.target.value)}
                className="w-full rounded-2xl border border-gray-300 p-3.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Amenities</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {amenitiesList.map(amenity => (
                <label
                  key={amenity}
                  className="flex cursor-pointer items-center gap-2 rounded-2xl border border-gray-300 p-3 hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                    className="rounded"
                  />
                  <span className="text-sm">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 flex gap-3 border-t bg-white/95 pb-5 pt-4 backdrop-blur md:static md:bg-transparent md:pb-0">
            <button
              type="button"
              onClick={clearFilters}
              className="flex-1 rounded-2xl border border-gray-300 px-4 py-3 font-medium transition hover:bg-gray-50"
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
