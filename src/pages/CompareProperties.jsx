import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaTimes, FaBed, FaBath, FaRulerCombined, FaCar } from 'react-icons/fa';
import properties from '../components/propertiesData';
import { storage } from '../utils/localStorage';

export default function CompareProperties() {
  const [searchParams] = useSearchParams();
  const [selectedIds, setSelectedIds] = useState([]);
  const [comparisonProperties, setComparisonProperties] = useState([]);
  const storedListings = storage.getListings().map((listing) => ({
    ...listing,
    image: listing.image || listing.images?.[0]?.preview || listing.images?.[0] || listing.imageUrl,
    badge: listing.badge || listing.listingType || 'For Sale'
  }));
  const allProperties = [...properties, ...storedListings];

  useEffect(() => {
    const ids = searchParams.get('ids')?.split(',').map(id => parseInt(id)) || [];
    setSelectedIds(ids);
    
    const props = ids.map(id => allProperties.find(p => p.id === id)).filter(Boolean);
    setComparisonProperties(props);
  }, [searchParams, allProperties]);

  const removeProperty = (id) => {
    const updated = selectedIds.filter(pid => pid !== id);
    const newUrl = updated.length > 0 
      ? `/compare?ids=${updated.join(',')}`
      : '/compare';
    window.history.pushState({}, '', newUrl);
    setSelectedIds(updated);
    setComparisonProperties(comparisonProperties.filter(p => p.id !== id));
  };

  const addProperty = (id) => {
    if (selectedIds.length >= 4) {
      alert('Maximum 4 properties can be compared at once');
      return;
    }
    if (!selectedIds.includes(id)) {
      const updated = [...selectedIds, id];
      window.history.pushState({}, '', `/compare?ids=${updated.join(',')}`);
      setSelectedIds(updated);
      const prop = allProperties.find(p => p.id === id);
      if (prop) setComparisonProperties([...comparisonProperties, prop]);
    }
  };

  const saveComparison = () => {
    if (selectedIds.length > 0) {
      storage.addComparison(selectedIds);
      alert('Comparison saved!');
    }
  };

  const comparisonFields = [
    { key: 'price', label: 'Price', icon: null },
    { key: 'location', label: 'Location', icon: null },
    { key: 'beds', label: 'Bedrooms', icon: FaBed },
    { key: 'baths', label: 'Bathrooms', icon: FaBath },
    { key: 'area', label: 'Area', icon: FaRulerCombined },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 mt-24">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Compare Properties</h1>
          <p className="text-gray-600">Select up to 4 properties to compare side by side</p>
        </div>

        {/* Property Selection */}
        {comparisonProperties.length < 4 && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-6">
            <h2 className="text-xl font-bold mb-4">Add Properties to Compare</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {allProperties.slice(0, 8).map(property => (
                <button
                  key={property.id}
                  onClick={() => addProperty(property.id)}
                  disabled={selectedIds.includes(property.id)}
                  className={`border-2 rounded-lg p-3 text-left hover:shadow-md transition-shadow ${
                    selectedIds.includes(property.id)
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200'
                  }`}
                >
                  <img src={property.image} alt={property.title} className="w-full aspect-square object-cover rounded mb-2" />
                  <h3 className="font-semibold text-sm mb-1">{property.title}</h3>
                  <p className="text-green-600 font-bold text-sm">{property.price}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Table */}
        {comparisonProperties.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Comparison</h2>
              {comparisonProperties.length > 0 && (
                <button
                  onClick={saveComparison}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Save Comparison
                </button>
              )}
            </div>
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Feature</th>
                  {comparisonProperties.map(property => (
                    <th key={property.id} className="text-center p-3 relative">
                      <button
                        onClick={() => removeProperty(property.id)}
                        className="absolute top-0 right-0 text-red-600 hover:text-red-800"
                      >
                        <FaTimes />
                      </button>
                      <Link to={`/property/${property.id}`}>
                        <img src={property.image} alt={property.title} className="w-full aspect-square object-cover rounded mb-2" />
                        <h3 className="font-semibold text-sm">{property.title}</h3>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFields.map(field => (
                  <tr key={field.key} className="border-b">
                    <td className="p-3 font-semibold">
                      {field.icon && <field.icon className="inline mr-2" />}
                      {field.label}
                    </td>
                    {comparisonProperties.map(property => (
                      <td key={property.id} className="p-3 text-center">
                        {property[field.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 text-center">
            <p className="text-gray-500">No properties selected for comparison. Add properties above to start comparing.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
