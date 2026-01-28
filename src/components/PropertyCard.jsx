import React from 'react';
import { Link } from 'react-router-dom';
import { FaBath, FaBed, FaMapMarkerAlt, FaRulerCombined } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  return (
    <div className="card p-0 overflow-hidden relative group transition-shadow hover:shadow-lg">
      <Link to={`/property/${property.id}`} className="relative block aspect-square overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=600&fit=crop`;
          }}
        />
        <span className="absolute top-3 left-3 bg-green-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          {property.badge}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
          <p className="text-sm font-semibold text-white">{property.title}</p>
          <div className="mt-1 flex items-center gap-2 text-xs text-white/80">
            <FaMapMarkerAlt className="text-green-300" />
            <span>{property.location}</span>
          </div>
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-green-600 font-bold text-lg">{property.price}</span>
          <span className="inline-flex items-center gap-1 text-xs text-gray-400">
            <FaRulerCombined />
            {property.area}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-gray-500 text-sm mb-4">
          <span className="inline-flex items-center gap-2">
            <FaBed className="text-green-600" />
            {property.beds} Beds
          </span>
          <span className="inline-flex items-center gap-2">
            <FaBath className="text-green-600" />
            {property.baths} Baths
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link
            to={`/property/${property.id}`}
            className="btn-secondary w-full sm:w-auto text-center mt-2 sm:mt-0 block"
          >
            View Details
          </Link>
          <Link
            to={`/compare?ids=${property.id}`}
            className="w-full sm:w-auto text-center mt-2 sm:mt-0 block border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors"
          >
            Compare
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
