import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FaBookmark,
  FaHome,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaSearch,
  FaTag,
  FaTimes
} from 'react-icons/fa';
import { SearchContext } from '../contexts/SearchContext';
import { storage } from '../utils/localStorage';

const defaultFields = { location: '', type: 'All Types', status: 'Any', min: '', max: '' };

const areFieldsEqual = (left, right) =>
  ['location', 'type', 'status', 'min', 'max'].every((key) => String(left?.[key] || '') === String(right?.[key] || ''));

const formatSearchLabel = (search) => {
  const bits = [];
  if (search.location) bits.push(search.location);
  if (search.type && search.type !== 'All Types') bits.push(search.type);
  if (search.status && search.status !== 'Any') bits.push(search.status);
  if (search.max) bits.push(`Under ₦${Number(search.max).toLocaleString('en-NG')}`);
  return bits.join(' • ') || 'All properties';
};

export default function PropertiesSearchBar({ onSearchApplied }) {
  const { setSearch } = useContext(SearchContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [fields, setFields] = useState(defaultFields);
  const [rangeError, setRangeError] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const recentSearches = useMemo(() => storage.getRecentSearches(), []);
  const savedSearches = useMemo(() => storage.getSavedSearches().slice(-3).reverse(), []);

  useEffect(() => {
    const nextFields = {
      location: searchParams.get('location') || '',
      type: searchParams.get('type') || 'All Types',
      status: searchParams.get('status') || 'Any',
      min: searchParams.get('min') || '',
      max: searchParams.get('max') || ''
    };

    setFields((previous) => (areFieldsEqual(previous, nextFields) ? previous : nextFields));
    setSearch(nextFields);
  }, [searchParams, setSearch]);

  const syncSearch = (nextFields, source = 'search_form') => {
    setFields(nextFields);
    setSearch(nextFields);

    const params = new URLSearchParams();
    Object.entries(nextFields).forEach(([key, value]) => {
      if (value && value !== 'All Types' && value !== 'Any') {
        params.set(key, value);
      }
    });
    setSearchParams(params, { replace: source !== 'search_form' });

    storage.addRecentSearch(nextFields);
    void storage.trackEvent('search_submitted', { source, ...nextFields });
    if (onSearchApplied) {
      onSearchApplied();
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextFields = { ...fields, [name]: value };
    const minVal = name === 'min' ? value : nextFields.min;
    const maxVal = name === 'max' ? value : nextFields.max;

    if (minVal && maxVal && Number(minVal) > Number(maxVal)) {
      setRangeError('Min price cannot be higher than max price.');
    } else {
      setRangeError('');
    }

    setFields(nextFields);
    setSearch(nextFields);
  };

  const applyPreset = (updates, source = 'quick_filter') => {
    const next = { ...fields, ...updates };
    syncSearch(next, source);
  };

  const resetAll = () => {
    setRangeError('');
    setSaveMessage('');
    syncSearch(defaultFields, 'search_reset');
  };

  const saveCurrentSearch = () => {
    storage.saveSearch(fields);
    setSaveMessage('Search saved for later.');
    setTimeout(() => setSaveMessage(''), 2500);
  };

  const activeChips = [
    fields.location ? { key: 'location', label: fields.location } : null,
    fields.type !== 'All Types' ? { key: 'type', label: fields.type } : null,
    fields.status !== 'Any' ? { key: 'status', label: fields.status } : null,
    fields.min ? { key: 'min', label: `Min ₦${Number(fields.min).toLocaleString('en-NG')}` } : null,
    fields.max ? { key: 'max', label: `Max ₦${Number(fields.max).toLocaleString('en-NG')}` } : null
  ].filter(Boolean);

  const quickFilters = [
    { label: 'Lagos', action: () => applyPreset({ location: 'Lagos' }) },
    { label: 'Abuja', action: () => applyPreset({ location: 'Abuja' }) },
    { label: 'Port Harcourt', action: () => applyPreset({ location: 'Port Harcourt' }) },
    { label: 'For Rent', action: () => applyPreset({ status: 'For Rent' }) },
    { label: 'Under ₦100M', action: () => applyPreset({ max: '100000000' }) },
    { label: 'Luxury', action: () => applyPreset({ min: '250000000' }) }
  ];

  const propertyLocations = [
    'Lagos',
    'Abuja',
    'Port Harcourt',
    'Kano',
    'Ibadan',
    'Enugu',
    'Benin City',
    'Kaduna',
    'Aba',
    'Calabar',
    'Ado Ekiti',
    'Abakaliki',
    'Osogbo',
    'Lafia',
    'Birnin Kebbi'
  ];

  return (
    <div className="space-y-4">
      <form
        className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white/95 p-4 shadow md:p-6"
        onSubmit={(event) => {
          event.preventDefault();
          syncSearch(fields, 'search_form');
        }}
      >
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.2fr_1fr_1fr_0.8fr_0.8fr_auto]">
          <div className="flex items-center rounded-lg bg-gray-100 px-3">
            <FaMapMarkerAlt className="mr-2 text-gray-400" />
            <input
              name="location"
              type="text"
              list="property-locations"
              placeholder="City or area (e.g. Lekki)"
              className="w-full bg-transparent py-3 outline-none"
              value={fields.location}
              onChange={handleChange}
            />
            <datalist id="property-locations">
              {propertyLocations.map((location) => (
                <option key={location} value={location} />
              ))}
            </datalist>
          </div>

          <div className="flex items-center rounded-lg bg-gray-100 px-3">
            <FaHome className="mr-2 text-gray-400" />
            <select
              name="type"
              className="w-full bg-transparent py-3 outline-none"
              value={fields.type}
              onChange={handleChange}
            >
              <option>All Types</option>
              <option>House</option>
              <option>Apartment</option>
              <option>Land</option>
              <option>Commercial</option>
            </select>
          </div>

          <div className="flex items-center rounded-lg bg-gray-100 px-3">
            <FaTag className="mr-2 text-gray-400" />
            <select
              name="status"
              className="w-full bg-transparent py-3 outline-none"
              value={fields.status}
              onChange={handleChange}
            >
              <option>Any</option>
              <option>For Sale</option>
              <option>For Rent</option>
              <option>Land</option>
            </select>
          </div>

          <div className="flex items-center rounded-lg bg-gray-100 px-3">
            <FaMoneyBillWave className="mr-2 text-gray-400" />
            <input
              name="min"
              type="number"
              inputMode="numeric"
              placeholder="Min ₦"
              className="w-full bg-transparent py-3 outline-none"
              value={fields.min}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center rounded-lg bg-gray-100 px-3">
            <FaMoneyBillWave className="mr-2 text-gray-400" />
            <input
              name="max"
              type="number"
              inputMode="numeric"
              placeholder="Max ₦"
              className="w-full bg-transparent py-3 outline-none"
              value={fields.max}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-white transition-colors hover:bg-green-700"
            >
              <FaSearch />
              Search
            </button>
            <button
              type="button"
              onClick={resetAll}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 transition-colors hover:bg-gray-50"
            >
              <FaTimes />
              Clear
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-gray-500">Quick filters:</span>
            {quickFilters.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={item.action}
                className="rounded-full border border-gray-200 bg-white px-3 py-1 transition hover:border-green-300 hover:text-green-700"
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={saveCurrentSearch}
            className="inline-flex items-center gap-2 self-start rounded-full border border-green-200 bg-green-50 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-100"
          >
            <FaBookmark />
            Save this search
          </button>
        </div>
      </form>

      {activeChips.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500">Active filters:</span>
          {activeChips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() => applyPreset({ [chip.key]: chip.key === 'type' ? 'All Types' : chip.key === 'status' ? 'Any' : '' }, 'chip_remove')}
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-3 py-1 text-sm text-white"
            >
              {chip.label}
              <FaTimes className="text-xs" />
            </button>
          ))}
        </div>
      ) : null}

      {(recentSearches.length > 0 || savedSearches.length > 0) ? (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {recentSearches.length > 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-gray-900">Recent searches</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={`${search.location}-${search.type}-${index}`}
                    type="button"
                    onClick={() => syncSearch(search, 'recent_search')}
                    className="rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-700 transition hover:border-green-300 hover:text-green-700"
                  >
                    {formatSearchLabel(search)}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {savedSearches.length > 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-gray-900">Saved searches</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {savedSearches.map((search) => (
                  <button
                    key={search.id}
                    type="button"
                    onClick={() => syncSearch(search, 'saved_search')}
                    className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm text-green-700 transition hover:bg-green-100"
                  >
                    {formatSearchLabel(search)}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {saveMessage ? <p className="text-sm text-green-700">{saveMessage}</p> : null}
      {rangeError ? <p className="text-sm text-red-600">{rangeError}</p> : null}
    </div>
  );
}
