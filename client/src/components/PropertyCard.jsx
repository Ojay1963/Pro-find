import React from 'react';
import { Link } from 'react-router-dom';
import { FaBath, FaBed, FaMapMarkerAlt, FaRulerCombined, FaShieldAlt, FaBolt } from 'react-icons/fa';
import { getPropertyTrustMetrics } from '../utils/propertyInsights';
import { applyFallbackImage, getPropertyImage } from '../utils/propertyImages';
import { useI18n } from '../contexts/I18nContext';
import CompareButton from './CompareButton';

const PropertyCard = ({ property }) => {
  const { t } = useI18n();
  const trust = getPropertyTrustMetrics(property);
  return (
    <div className="property-card-mobile card relative flex h-full flex-col overflow-hidden p-0 group transition-shadow hover:shadow-lg">
      <Link to={`/property/${property.id}`} className="relative block aspect-[1/1] overflow-hidden sm:aspect-square">
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
        <span className="absolute top-3 left-3 rounded-full bg-green-600/90 px-3 py-1 text-xs font-semibold text-white shadow">
          {property.badge}
        </span>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-4">
          <p className="text-sm font-semibold text-white">{property.title}</p>
          <div className="mt-1 flex items-center gap-2 text-xs text-white/80">
            <FaMapMarkerAlt className="text-green-300" />
            <span>{property.location}</span>
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <span className="text-lg font-bold text-green-600">{property.price}</span>
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-400">
              {t('featured.card.readyLabel', 'Ready to view')}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs text-gray-400">
            <FaRulerCombined />
            {property.area}
          </span>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-3 text-sm text-gray-500">
          <span className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2">
            <FaBed className="text-green-600" />
            {property.beds} {t('featured.card.beds', 'Beds')}
          </span>
          <span className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2">
            <FaBath className="text-green-600" />
            {property.baths} {t('featured.card.baths', 'Baths')}
          </span>
        </div>
        <div className="mb-4 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-green-50 border border-green-100 px-2 py-1 text-green-700 inline-flex items-center gap-1"><FaShieldAlt /> {trust.verificationLabel}</span>
          <span className="rounded-full bg-gray-50 border border-gray-200 px-2 py-1 text-gray-600 inline-flex items-center gap-1"><FaBolt /> {trust.availability}</span>
        </div>
        <div className="mt-auto flex flex-col gap-2 sm:flex-row sm:items-stretch">
          <Link
            to={`/property/${property.id}`}
            className="mt-2 flex min-h-[48px] w-full min-w-0 items-center justify-center whitespace-nowrap rounded-2xl bg-green-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-700 sm:mt-0 sm:flex-1 sm:self-stretch"
          >
            {t('featured.card.viewDetails', 'View Details')}
          </Link>
          <div className="mt-2 w-full sm:mt-0 sm:flex-1">
            <CompareButton propertyId={property.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
