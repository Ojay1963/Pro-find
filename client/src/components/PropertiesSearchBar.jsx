import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaBookmark, FaChevronDown, FaTimes } from 'react-icons/fa';
import { SearchContext } from '../contexts/SearchContext';
import { useI18n } from '../contexts/I18nContext';
import { storage } from '../utils/localStorage';

const defaultFields = { location: '', type: 'All Types', status: 'Buy', beds: '', min: '', max: '' };
const listingTabs = ['Buy', 'Rent'];
const bedroomOptions = ['1', '2', '3', '4', '5', '6+'];
const priceOptions = [
  { value: '', minLabel: 'No Min', maxLabel: 'No Max' },
  { value: '500000', minLabel: '₦500k', maxLabel: '₦500k' },
  { value: '1000000', minLabel: '₦1M', maxLabel: '₦1M' },
  { value: '2500000', minLabel: '₦2.5M', maxLabel: '₦2.5M' },
  { value: '5000000', minLabel: '₦5M', maxLabel: '₦5M' },
  { value: '10000000', minLabel: '₦10M', maxLabel: '₦10M' },
  { value: '25000000', minLabel: '₦25M', maxLabel: '₦25M' },
  { value: '50000000', minLabel: '₦50M', maxLabel: '₦50M' },
  { value: '100000000', minLabel: '₦100M', maxLabel: '₦100M' },
  { value: '250000000', minLabel: '₦250M', maxLabel: '₦250M' }
];

const areFieldsEqual = (left, right) =>
  ['location', 'type', 'status', 'beds', 'min', 'max'].every((key) => String(left?.[key] || '') === String(right?.[key] || ''));

const formatSearchLabel = (search) => {
  const bits = [];
  if (search.location) bits.push(search.location);
  if (search.status && search.status !== 'Buy') bits.push(search.status);
  if (search.type && search.type !== 'All Types') bits.push(search.type);
  if (search.beds) bits.push(`${search.beds} bed`);
  if (search.max) bits.push(`Under ₦${Number(search.max).toLocaleString('en-NG')}`);
  return bits.join(' • ') || 'All properties';
};

export default function PropertiesSearchBar({ onSearchApplied, resultsPath = '' }) {
  const { t } = useI18n();
  const { setSearch } = useContext(SearchContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [fields, setFields] = useState(defaultFields);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [rangeError, setRangeError] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const recentSearches = useMemo(() => storage.getRecentSearches(), []);
  const savedSearches = useMemo(() => storage.getSavedSearches().slice(-3).reverse(), []);

  useEffect(() => {
    const nextFields = {
      location: searchParams.get('location') || '',
      type: searchParams.get('type') || 'All Types',
      status: searchParams.get('status') || 'Buy',
      beds: searchParams.get('beds') || '',
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
      if (value && value !== 'All Types' && value !== 'Buy') {
        params.set(key, value);
      }
    });
    if (resultsPath) {
      navigate(
        {
          pathname: resultsPath,
          search: params.toString() ? `?${params.toString()}` : ''
        },
        { replace: false }
      );
    } else {
      setSearchParams(params, { replace: source !== 'search_form' });
    }

    storage.addRecentSearch(nextFields);
    void storage.trackEvent('search_submitted', { source, ...nextFields });
    if (onSearchApplied) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => onSearchApplied(nextFields));
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextFields = { ...fields, [name]: value };
    const minVal = name === 'min' ? value : nextFields.min;
    const maxVal = name === 'max' ? value : nextFields.max;

    if (minVal && maxVal && Number(minVal) > Number(maxVal)) {
      setRangeError(t('propertiesPage.search.rangeError', 'Min price cannot be higher than max price.'));
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
    setSaveMessage(t('propertiesPage.search.savedMessage', 'Search saved for later.'));
    setTimeout(() => setSaveMessage(''), 2500);
  };

  const activeChips = [
    fields.location ? { key: 'location', label: fields.location } : null,
    fields.status !== 'Buy' ? { key: 'status', label: fields.status } : null,
    fields.type !== 'All Types' ? { key: 'type', label: fields.type } : null,
    fields.beds ? { key: 'beds', label: `${fields.beds} bed` } : null,
    fields.min ? { key: 'min', label: `Min ₦${Number(fields.min).toLocaleString('en-NG')}` } : null,
    fields.max ? { key: 'max', label: `Max ₦${Number(fields.max).toLocaleString('en-NG')}` } : null
  ].filter(Boolean);

  const quickFilters = [
    { label: 'Rent', action: () => applyPreset({ status: 'Rent' }) },
    { label: '3 Bedrooms', action: () => applyPreset({ beds: '3' }) },
    { label: 'Under ₦100M', action: () => applyPreset({ max: '100000000' }) }
  ];

  return (
    <div className="space-y-4">
      <form
        className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-emerald-100/60 bg-[#163124]/85 shadow-2xl backdrop-blur-sm"
        onSubmit={(event) => {
          event.preventDefault();
          syncSearch(fields, 'search_form');
        }}
      >
        <div className="grid grid-cols-2 border-b border-emerald-100/20 bg-[#0f2218]/40 text-white">
          {listingTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFields((previous) => ({ ...previous, status: tab }))}
              className={`relative px-4 py-4 text-base font-medium transition-colors ${
                fields.status === tab ? 'bg-green-600' : 'hover:bg-white/10'
              }`}
            >
              {tab}
              {fields.status === tab ? (
                <span className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-green-600" />
              ) : null}
            </button>
          ))}
        </div>

        <div className="space-y-5 p-3 md:p-4">
          <div className="rounded-md bg-white px-4 py-4 shadow-sm">
            <input
              name="location"
              type="text"
              placeholder={t('propertiesPage.search.locationPlaceholder', 'City or area (e.g. Lekki)')}
              className="w-full bg-transparent text-xl text-slate-700 outline-none placeholder:text-slate-500 md:text-2xl"
              value={fields.location}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 text-white md:grid-cols-4">
            <label className="space-y-2">
              <span className="text-sm font-medium">Type</span>
              <select
                name="type"
                className="w-full rounded-md border border-white/20 bg-white px-4 py-3 text-slate-700 outline-none"
                value={fields.type}
                onChange={handleChange}
              >
                <option>{t('propertiesPage.search.allTypes', 'All Types')}</option>
                <option>{t('propertiesPage.search.house', 'House')}</option>
                <option>{t('propertiesPage.search.apartment', 'Apartment')}</option>
                <option>{t('propertiesPage.search.land', 'Land')}</option>
                <option>{t('propertiesPage.search.commercial', 'Commercial')}</option>
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium">Bedrooms</span>
              <select
                name="beds"
                className="w-full rounded-md border border-white/20 bg-white px-4 py-3 text-slate-700 outline-none"
                value={fields.beds}
                onChange={handleChange}
              >
                <option value="">Any</option>
                {bedroomOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium">Min price</span>
              <select
                name="min"
                className="w-full rounded-md border border-white/20 bg-white px-4 py-3 text-slate-700 outline-none"
                value={fields.min}
                onChange={handleChange}
              >
                {priceOptions.map((option) => (
                  <option key={`min-${option.value || 'none'}`} value={option.value}>
                    {option.minLabel}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium">Max price</span>
              <select
                name="max"
                className="w-full rounded-md border border-white/20 bg-white px-4 py-3 text-slate-700 outline-none"
                value={fields.max}
                onChange={handleChange}
              >
                {priceOptions.map((option) => (
                  <option key={`max-${option.value || 'none'}`} value={option.value}>
                    {option.maxLabel}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <button
              type="button"
              onClick={() => setShowMoreOptions((previous) => !previous)}
              className="inline-flex items-center gap-2 text-base text-white/95"
            >
              <span>More search options</span>
              <FaChevronDown className={`text-sm transition-transform ${showMoreOptions ? 'rotate-180' : ''}`} />
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-green-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-green-700 md:min-w-[174px]"
            >
              Search
            </button>
          </div>

          {showMoreOptions ? (
            <div className="rounded-xl bg-white p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-gray-500">{t('propertiesPage.search.quickFilters', 'Quick filters:')}</span>
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

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={saveCurrentSearch}
                    className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-100"
                  >
                    <FaBookmark />
                    {t('propertiesPage.search.saveThisSearch', 'Save this search')}
                  </button>
                  <button
                    type="button"
                    onClick={resetAll}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <FaTimes />
                    {t('propertiesPage.search.clear', 'Clear')}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </form>

      {activeChips.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500">{t('propertiesPage.search.activeFilters', 'Active filters:')}</span>
          {activeChips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() =>
                applyPreset(
                  {
                    [chip.key]:
                      chip.key === 'type' ? 'All Types' : chip.key === 'status' ? 'Buy' : ''
                  },
                  'chip_remove'
                )
              }
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-3 py-1 text-sm text-white"
            >
              {chip.label}
              <FaTimes className="text-xs" />
            </button>
          ))}
        </div>
      ) : null}

      {saveMessage ? <p className="text-sm text-green-700">{saveMessage}</p> : null}
      {rangeError ? <p className="text-sm text-red-600">{rangeError}</p> : null}
    </div>
  );
}
