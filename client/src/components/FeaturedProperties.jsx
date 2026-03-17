import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBath, FaBed, FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaRulerCombined } from 'react-icons/fa';
import { SearchContext } from '../contexts/SearchContext.jsx';
import { useI18n } from '../contexts/I18nContext';
import properties from './propertiesData';
import { storage } from '../utils/localStorage';
import FavoriteButton from './FavoriteButton';
import CompareButton from './CompareButton';
import { attachDistanceToProperty } from '../utils/propertyLocation';
import { getPropertyTrustMetrics, normalizeText, parseAreaNumber, parsePriceNumber } from '../utils/propertyInsights';
import { applyFallbackImage, getPropertyImage } from '../utils/propertyImages';

function FeaturedProperties({
  showAll = false,
  sortBy = 'relevance',
  viewMode = 'grid',
  advancedFilters = {},
  userLocation = null,
  title = 'Discover standout listings',
  subtitle = 'Curated homes and apartments with verified agents and transparent pricing.',
  badge = 'Featured',
  emptyTitle = 'No properties found matching your criteria',
  emptyText = 'Try adjusting your filters or search terms'
}) {
  const { search } = useContext(SearchContext);
  const { t } = useI18n();

  const [groupSize, setGroupSize] = useState(3);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  /* -------------------- FILTER & SORT -------------------- */

  const parseParking = (value) => {
    const match = String(value || '').match(/\d+/);
    return match ? Number(match[0]) : 0;
  };

  const storedListings = storage.getListings().map((listing) => ({
    ...listing,
    image: listing.image || listing.images?.[0]?.preview || listing.images?.[0] || listing.imageUrl,
    features: listing.features || listing.amenities || [],
    badge: listing.badge || listing.listingType || 'For Sale'
  }));

  let filtered = [...properties, ...storedListings].filter((property) => {
    if (
      search.location &&
      !normalizeText(property.location).includes(normalizeText(search.location))
    ) {
      return false;
    }

    if (
      search.type &&
      search.type !== 'All Types' &&
      normalizeText(property.propertyType) !== normalizeText(search.type)
    ) {
      return false;
    }

    if (search.status && search.status !== 'Buy') {
      const badge = normalizeText(property.badge);
      const wantsRent = normalizeText(search.status) === 'rent';
      const wantsShortLet = normalizeText(search.status) === 'short let';

      if (wantsRent && badge !== 'for rent') {
        return false;
      }

      if (wantsShortLet && badge !== 'short let') {
        return false;
      }
    }

    if (search.beds) {
      const minimumBeds = search.beds === '6+' ? 6 : Number(search.beds);
      if ((Number(property.beds) || 0) < minimumBeds) {
        return false;
      }
    }

    const price = parsePriceNumber(property.price);

    if (search.min && price < Number(search.min)) return false;
    if (search.max && price > Number(search.max)) return false;

    if (advancedFilters.beds && property.beds < Number(advancedFilters.beds)) {
      return false;
    }

    if (advancedFilters.baths && property.baths < Number(advancedFilters.baths)) {
      return false;
    }

    if (
      advancedFilters.propertyType &&
      normalizeText(property.propertyType) !== normalizeText(advancedFilters.propertyType)
    ) {
      return false;
    }

    if (advancedFilters.listingType) {
      const badge = normalizeText(property.badge);
      const isRent = badge === 'for rent';
      const isSale = badge === 'for sale' || badge === 'land';

      if (advancedFilters.listingType === 'Rent' || advancedFilters.listingType === 'Lease') {
        if (!isRent) return false;
      }

      if (advancedFilters.listingType === 'Buy') {
        if (!isSale) return false;
      }
    }

    if (advancedFilters.minSize || advancedFilters.maxSize) {
      const area = parseAreaNumber(property.area);
      if (advancedFilters.minSize && area < Number(advancedFilters.minSize)) {
        return false;
      }
      if (advancedFilters.maxSize && area > Number(advancedFilters.maxSize)) {
        return false;
      }
    }

    if (advancedFilters.yearBuilt) {
      if (property.yearBuilt < Number(advancedFilters.yearBuilt)) {
        return false;
      }
    }

    if (advancedFilters.parking) {
      const parkingCount = parseParking(property.parking);
      if (parkingCount < Number(advancedFilters.parking)) {
        return false;
      }
    }

    if (advancedFilters.amenities && advancedFilters.amenities.length > 0) {
      const propertyAmenities = (property.features || []).map((item) => normalizeText(item));
      const selectedAmenities = advancedFilters.amenities.map((item) => normalizeText(item));
      const hasAllAmenities = selectedAmenities.every((amenity) =>
        propertyAmenities.includes(amenity)
      );

      if (!hasAllAmenities) {
        return false;
      }
    }

    return true;
  });

  filtered = filtered.map((property) => attachDistanceToProperty(property, userLocation));

  if (!showAll) {
    filtered = filtered.slice(0, 28);
  }

  filtered.sort((a, b) => {
    const priceA = parsePriceNumber(a.price);
    const priceB = parsePriceNumber(b.price);

    switch (sortBy) {
      case 'price-low':
        return priceA - priceB;
      case 'price-high':
        return priceB - priceA;
      case 'date-new':
        return b.id - a.id;
      case 'date-old':
        return a.id - b.id;
      case 'nearest': {
        const distanceA = typeof a.distanceKm === 'number' ? a.distanceKm : Number.POSITIVE_INFINITY;
        const distanceB = typeof b.distanceKm === 'number' ? b.distanceKm : Number.POSITIVE_INFINITY;
        return distanceA - distanceB;
      }
      case 'popularity': {
        const scoreA = getPropertyTrustMetrics(a).inquiryIndex + getPropertyTrustMetrics(a).viewIndex;
        const scoreB = getPropertyTrustMetrics(b).inquiryIndex + getPropertyTrustMetrics(b).viewIndex;
        return scoreB - scoreA;
      }
      default:
        return 0;
    }
  });

  const totalGroups = Math.ceil(filtered.length / groupSize);
  const start = currentGroup * groupSize;
  const end = Math.min(start + groupSize, filtered.length);
  const displayedProperties = showAll ? filtered : filtered.slice(start, end);

  useEffect(() => {
    const updateGroupSize = () => {
      if (window.innerWidth < 640) {
        setGroupSize(1);
        return;
      }
      if (window.innerWidth < 1024) {
        setGroupSize(2);
        return;
      }
      setGroupSize(3);
    };

    updateGroupSize();
    window.addEventListener('resize', updateGroupSize);
    return () => window.removeEventListener('resize', updateGroupSize);
  }, []);

  useEffect(() => {
    if (filtered.length > 0 && currentGroup >= totalGroups) {
      setCurrentGroup(0);
    }
  }, [filtered, currentGroup, totalGroups]);

  /* -------------------- NAVIGATION -------------------- */

  const handleNext = () => {
    if (isAnimating || filtered.length === 0) return;

    setIsAnimating(true);
    setCurrentGroup((prev) =>
      prev >= totalGroups - 1 ? 0 : prev + 1
    );

    setTimeout(() => setIsAnimating(false), 300);
  };

  const handlePrev = () => {
    if (isAnimating || filtered.length === 0) return;

    setIsAnimating(true);
    setCurrentGroup((prev) =>
      prev <= 0 ? totalGroups - 1 : prev - 1
    );

    setTimeout(() => setIsAnimating(false), 300);
  };

  const getShowingText = () => {
    if (filtered.length === 0) {
      return t('featured.adjustFilters', 'Try adjusting your filters to see more properties');
    }

    if (showAll) {
      return t('featured.matchingPreferences', 'Explore properties matching your preferences');
    }

    const startNum = start + 1;
    const endNum = Math.min(end, filtered.length);

    return t(
      'featured.showingRange',
      `Discover your perfect home - viewing ${startNum}-${endNum} of ${filtered.length} properties`
    )
      .replace('{start}', String(startNum))
      .replace('{end}', String(endNum))
      .replace('{total}', String(filtered.length));
  };

  /* -------------------- RENDER -------------------- */

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4 relative">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-green-600 mb-3">{t('featured.badge', badge)}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {t('featured.title', title)}
          </h2>
          <p className="mt-3 text-gray-500">
            {t('featured.subtitle', subtitle)}
          </p>
        </div>

        <p className="text-center text-gray-500 mb-10">
          {getShowingText()}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">{t('featured.noneTitle', emptyTitle)}</p>
            <p className="text-gray-500 mt-2">{t('featured.noneText', emptyText)}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2 text-sm">
              <span className="rounded-full border border-gray-200 px-3 py-1 text-gray-600">Try clearing price limits</span>
              <span className="rounded-full border border-gray-200 px-3 py-1 text-gray-600">Switch to another city</span>
              <span className="rounded-full border border-gray-200 px-3 py-1 text-gray-600">Use “All Types” for broader results</span>
            </div>
          </div>
        ) : (
          <>
            <div
              className="relative"
            >
              <div
                className={
                  viewMode === 'list'
                    ? 'flex flex-col gap-6'
                    : `flex ${showAll ? 'flex-wrap justify-center gap-6' : 'justify-center gap-6'}`
                }
              >
                {displayedProperties.map((property, index) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property}
                    showAll={showAll}
                    viewMode={viewMode}
                    animationDelay={`${index * 90}ms`}
                  />
                ))}
              </div>

              {!showAll && totalGroups > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 text-green-700 w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all z-10 text-xl"
                    disabled={isAnimating}
                  >
                    <FaChevronLeft />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 text-green-700 w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all z-10 text-xl"
                    disabled={isAnimating}
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>

            {!showAll && totalGroups > 1 && (
              <div className="flex justify-center gap-3 mt-8">
                {Array.from({ length: totalGroups }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentGroup(index)}
                    disabled={isAnimating}
                    className={`h-2.5 rounded-full transition-all ${
                      index === currentGroup
                        ? 'bg-green-600 w-8'
                        : 'bg-gray-300 hover:bg-gray-400 w-3'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

/* -------------------- CARD COMPONENT -------------------- */

function PropertyCard({ property, showAll = false, viewMode = 'grid', animationDelay = '0ms' }) {
  const { t } = useI18n();
  const trust = getPropertyTrustMetrics(property);
  return (
    <div
      className={`${viewMode === 'list' ? 'w-full' : showAll ? 'w-full max-w-sm' : 'w-80'} card p-0 overflow-hidden hover:shadow-xl transition-all duration-300 group animate-pop-in`}
      style={{ animationDelay }}
    >
      <Link to={`/property/${property.id}`} className="relative block aspect-square overflow-hidden">
        <img
          src={getPropertyImage(property)}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 640px) 100vw, 320px"
          onError={(e) => {
            applyFallbackImage(e, property);
          }}
        />

        <span className="absolute top-3 left-3 bg-green-600/90 text-white text-xs px-3 py-1 rounded-full shadow">
          {property.badge}
        </span>

        <div className="absolute top-3 right-3">
          <FavoriteButton propertyId={property.id} />
        </div>

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
          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
            <FaRulerCombined />
            {property.area}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-5">
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
          <span className="rounded-full bg-green-50 border border-green-100 px-2 py-1 text-green-700">{trust.verificationLabel}</span>
          <span className="rounded-full bg-gray-50 border border-gray-200 px-2 py-1 text-gray-600">{trust.availability}</span>
          {property.distanceLabel ? (
            <span className="rounded-full bg-blue-50 border border-blue-100 px-2 py-1 text-blue-700">{property.distanceLabel}</span>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            to={`/property/${property.id}`}
            className="block w-full py-2 px-4 bg-green-600 text-white text-center rounded-md hover:bg-green-700 transition-colors"
          >
            {t('featured.card.viewDetails', 'View Details')}
          </Link>
          <CompareButton propertyId={property.id} />
        </div>
      </div>
    </div>
  );
}

export default FeaturedProperties;

