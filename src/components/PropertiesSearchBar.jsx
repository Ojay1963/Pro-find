
import React, { useContext } from 'react';
import { SearchContext } from '../contexts/SearchContext';
import { FaMapMarkerAlt, FaHome, FaMoneyBillWave, FaTag, FaSearch, FaTimes } from 'react-icons/fa';

export default function PropertiesSearchBar({ onSearchApplied }) {
  const { setSearch } = useContext(SearchContext);
  const [fields, setFields] = React.useState({
    location: '',
    type: 'All Types',
    status: 'Any',
    min: '',
    max: ''
  });
  const [rangeError, setRangeError] = React.useState('');

  // Clear previous search terms on mount
  React.useEffect(() => {
    const defaults = { location: '', type: 'All Types', status: 'Any', min: '', max: '' };
    setFields(defaults);
    setSearch(defaults);
  }, [setSearch]);

  // Update both local and context state on change
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFields = { ...fields, [name]: value };
    const minVal = name === 'min' ? value : newFields.min;
    const maxVal = name === 'max' ? value : newFields.max;

    if (minVal && maxVal && Number(minVal) > Number(maxVal)) {
      setRangeError('Min price cannot be higher than max price.');
    } else {
      setRangeError('');
    }

    setFields(newFields);
    setSearch(newFields);
  };

  const applyQuick = (updates) => {
    const next = { ...fields, ...updates };
    setFields(next);
    setSearch(next);
    if (onSearchApplied) {
      onSearchApplied();
    }
  };

  const resetAll = () => {
    const defaults = { location: '', type: 'All Types', status: 'Any', min: '', max: '' };
    setFields(defaults);
    setRangeError('');
    setSearch(defaults);
  };

  const quickFilters = [
    { label: 'Lagos', action: () => applyQuick({ location: 'Lagos' }) },
    { label: 'Abuja', action: () => applyQuick({ location: 'Abuja' }) },
    { label: 'Port Harcourt', action: () => applyQuick({ location: 'Port Harcourt' }) },
    { label: 'For Rent', action: () => applyQuick({ status: 'For Rent' }) },
    { label: 'Under ₦100M', action: () => applyQuick({ max: '100000000' }) },
    { label: 'Luxury', action: () => applyQuick({ min: '250000000' }) }
  ];

  return (
    <div className="space-y-3">
      <form
        className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4 bg-white/90 border border-gray-200 rounded-xl shadow p-4 md:p-6"
        onSubmit={(e) => {
          e.preventDefault();
          setSearch(fields);
          if (onSearchApplied) {
            onSearchApplied();
          }
        }}
      >
        <div className="flex items-center w-full lg:w-auto bg-gray-100 rounded-lg px-3">
          <FaMapMarkerAlt className="text-gray-400 mr-2" />
          <input
            name="location"
            type="text"
            list="property-locations"
            placeholder="City or area (e.g. Lekki)"
            className="bg-transparent outline-none py-2 w-full lg:w-48"
            value={fields.location}
            onChange={handleChange}
          />
          <datalist id="property-locations">
            <option value="Lagos" />
            <option value="Abuja" />
            <option value="Port Harcourt" />
            <option value="Kano" />
            <option value="Ibadan" />
            <option value="Enugu" />
            <option value="Benin City" />
            <option value="Kaduna" />
            <option value="Aba" />
            <option value="Calabar" />
          </datalist>
        </div>

        <div className="flex items-center w-full lg:w-auto bg-gray-100 rounded-lg px-3">
          <FaHome className="text-gray-400 mr-2" />
          <select
            name="type"
            className="bg-transparent outline-none py-2 w-full lg:w-40"
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

        <div className="flex items-center w-full lg:w-auto bg-gray-100 rounded-lg px-3">
          <FaTag className="text-gray-400 mr-2" />
          <select
            name="status"
            className="bg-transparent outline-none py-2 w-full lg:w-36"
            value={fields.status}
            onChange={handleChange}
          >
            <option>Any</option>
            <option>For Sale</option>
            <option>For Rent</option>
          </select>
        </div>

        <div className="flex items-center w-full lg:w-auto bg-gray-100 rounded-lg px-3">
          <FaMoneyBillWave className="text-gray-400 mr-2" />
          <input
            name="min"
            type="number"
            inputMode="numeric"
            placeholder="Min ₦"
            className="bg-transparent outline-none py-2 w-full lg:w-28"
            value={fields.min}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center w-full lg:w-auto bg-gray-100 rounded-lg px-3">
          <FaMoneyBillWave className="text-gray-400 mr-2" />
          <input
            name="max"
            type="number"
            inputMode="numeric"
            placeholder="Max ₦"
            className="bg-transparent outline-none py-2 w-full lg:w-28"
            value={fields.max}
            onChange={handleChange}
          />
        </div>

        <div className="flex w-full lg:w-auto gap-2">
          <button
            type="submit"
            className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FaSearch />
            Search
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FaTimes />
            Clear
          </button>
        </div>
      </form>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-gray-500">Quick filters:</span>
        {quickFilters.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={item.action}
            className="px-3 py-1 rounded-full border border-gray-200 bg-white hover:border-green-300 hover:text-green-700 transition"
          >
            {item.label}
          </button>
        ))}
      </div>

      {rangeError && (
        <p className="text-sm text-red-600">{rangeError}</p>
      )}
    </div>
  );
}
