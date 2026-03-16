import React from 'react';
import { Link } from 'react-router-dom';
import { FaBath, FaBed, FaMapMarkerAlt, FaRulerCombined, FaShieldAlt, FaBolt } from 'react-icons/fa';
import { getPropertyTrustMetrics } from '../utils/propertyInsights';
import { applyFallbackImage, getPropertyImage } from '../utils/propertyImages';
import { useI18n } from '../contexts/I18nContext';

const PropertyCard = ({ property }) => {
  const { t } = useI18n();
  const trust = getPropertyTrustMetrics(property);
  return (
    <div className="card relative flex h-full flex-col overflow-hidden p-0 group transition-shadow hover:shadow-lg">
      <Link to={`/property/${property.id}`} className="relative block aspect-square overflow-hidden">
        <img
          src={getPropertyImage(property)}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 768px) 100vw, 320px"
          onError={(e) => {
            applyFallbackImage(e, property);
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
      <div className="flex flex-1 flex-col p-5">
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
            {property.beds} {t('featured.card.beds', 'Beds')}
          </span>
          <span className="inline-flex items-center gap-2">
            <FaBath className="text-green-600" />
            {property.baths} {t('featured.card.baths', 'Baths')}
          </span>
        </div>
        <div className="mb-4 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-green-50 border border-green-100 px-2 py-1 text-green-700 inline-flex items-center gap-1"><FaShieldAlt /> {trust.verificationLabel}</span>
          <span className="rounded-full bg-gray-50 border border-gray-200 px-2 py-1 text-gray-600 inline-flex items-center gap-1"><FaBolt /> {trust.availability}</span>
        </div>
        <div className="mt-auto flex flex-col gap-2 sm:flex-row">
          <Link
            to={`/property/${property.id}`}
            className="btn-secondary w-full sm:w-auto text-center mt-2 sm:mt-0 block"
          >
            {t('featured.card.viewDetails', 'View Details')}
          </Link>
          <Link
            to={`/compare?ids=${property.id}`}
            className="w-full sm:w-auto text-center mt-2 sm:mt-0 block border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 hover:border-green-500 hover:text-green-600 transition-colors"
          >
            {t('featured.card.compare', 'Compare')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
