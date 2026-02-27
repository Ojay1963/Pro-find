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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20 pb-10 px-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
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

        <div className="p-6 space-y-6">
          {/* Listing Type */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Listing Type</label>
            <div className="grid grid-cols-3 gap-3">
              {['Buy', 'Rent', 'Lease'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleChange('listingType', filters.listingType === type ? '' : type)}
                  className={`p-3 border-2 rounded-lg font-medium transition ${
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Max Size"
                value={filters.maxSize}
                onChange={(e) => handleChange('maxSize', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Year Built & Parking */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Year Built</label>
              <input
                type="number"
                placeholder="e.g. 2020"
                value={filters.yearBuilt}
                onChange={(e) => handleChange('yearBuilt', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Parking Spaces</label>
              <select
                value={filters.parking}
                onChange={(e) => handleChange('parking', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
            <div className="grid grid-cols-3 gap-2">
              {amenitiesList.map(amenity => (
                <label
                  key={amenity}
                  className="flex items-center gap-2 p-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
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
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={clearFilters}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition"
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
