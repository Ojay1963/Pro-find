import { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaBath, FaBed, FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaRulerCombined } from 'react-icons/fa';
import { SearchContext } from '../contexts/SearchContext.jsx';
import properties from './propertiesData';
import FavoriteButton from './FavoriteButton';

function FeaturedProperties({
  showAll = false,
  sortBy = 'relevance',
  viewMode = 'grid',
  advancedFilters = {},
}) {
  const { search } = useContext(SearchContext);

  const [groupSize, setGroupSize] = useState(3);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const shuffleSeedRef = useRef(Math.random());

  /* -------------------- FILTER & SORT -------------------- */

  const normalizeText = (value) => String(value || '').toLowerCase();
  const parseNumber = (value) => Number(String(value || '').replace(/[^\d]/g, '')) || 0;
  const parseArea = (value) => Number(String(value || '').replace(/[^\d]/g, '')) || 0;
  const parseParking = (value) => {
    const match = String(value || '').match(/\d+/);
    return match ? Number(match[0]) : 0;
  };

  let filtered = properties.filter((property) => {
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

    if (search.status && search.status !== 'Any') {
      if (normalizeText(property.badge) !== normalizeText(search.status)) {
        return false;
      }
    }

    const price = parseNumber(property.price);

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
      const area = parseArea(property.area);
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

  if (!showAll) {
    filtered = filtered.slice(0, 28);
  }

  filtered.sort((a, b) => {
    const priceA = parseNumber(a.price);
    const priceB = parseNumber(b.price);

    switch (sortBy) {
      case 'price-low':
        return priceA - priceB;
      case 'price-high':
        return priceB - priceA;
      case 'date-new':
        return b.id - a.id;
      case 'date-old':
        return a.id - b.id;
      default:
        return 0;
    }
  });

  if (sortBy === 'relevance') {
    const seed = shuffleSeedRef.current;
    const scoreFor = (property) => {
      const badge = normalizeText(property.badge);
      if (badge !== 'for sale' && badge !== 'for rent') {
        return Number.POSITIVE_INFINITY;
      }
      const raw = Math.sin(property.id * 9999 + seed * 10000) * 10000;
      return raw - Math.floor(raw);
    };

    const saleRent = filtered
      .filter((property) => ['for sale', 'for rent'].includes(normalizeText(property.badge)))
      .sort((a, b) => scoreFor(a) - scoreFor(b));
    const others = filtered.filter(
      (property) => !['for sale', 'for rent'].includes(normalizeText(property.badge))
    );

    filtered = [...saleRent, ...others];
  }

  const totalGroups = Math.ceil(filtered.length / groupSize);
  const start = currentGroup * groupSize;
  const end = Math.min(start + groupSize, filtered.length);
  const displayedProperties = showAll ? filtered : filtered.slice(start, end);

  /* -------------------- CAROUSEL INTERVAL -------------------- */

  const clearIntervalSafe = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startInterval = () => {
    clearIntervalSafe();
    intervalRef.current = setInterval(() => {
      if (!isPaused && !isAnimating && totalGroups > 1) {
        handleNext();
      }
    }, 4000);
  };

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
    if (showAll || totalGroups <= 1) {
      clearIntervalSafe();
      return;
    }

    startInterval();
    return clearIntervalSafe;
  }, [showAll, totalGroups, isPaused, isAnimating]);

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

  const handlePointerEnter = (event) => {
    if (event.pointerType === 'mouse') {
      setIsPaused(true);
    }
  };

  const handlePointerLeave = (event) => {
    if (event.pointerType === 'mouse') {
      setIsPaused(false);
    }
  };

  const getShowingText = () => {
    if (filtered.length === 0) {
      return 'Try adjusting your filters to see more properties';
    }

    if (showAll) {
      return 'Explore properties matching your preferences';
    }

    const startNum = start + 1;
    const endNum = Math.min(end, filtered.length);

    return `Discover your perfect home - viewing ${startNum}-${endNum} of ${filtered.length} properties`;
  };

  /* -------------------- RENDER -------------------- */

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4 relative">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-green-600 mb-3">Featured</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Discover standout listings
          </h2>
          <p className="mt-3 text-gray-500">
            Curated homes and apartments with verified agents and transparent pricing.
          </p>
        </div>

        <p className="text-center text-gray-500 mb-10">
          {getShowingText()}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No properties found matching your criteria</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <>
            <div
              className="relative"
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
            >
              <div className={`flex ${showAll ? 'flex-wrap justify-center gap-6' : 'justify-center gap-6'}`}>
                {displayedProperties.map((property, index) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property}
                    showAll={showAll}
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

function PropertyCard({ property, showAll = false, animationDelay = '0ms' }) {
  return (
    <div
      className={`${showAll ? 'w-full max-w-sm' : 'w-80'} card p-0 overflow-hidden hover:shadow-xl transition-all duration-300 group animate-pop-in`}
      style={{ animationDelay }}
    >
      <Link to={`/property/${property.id}`} className="relative block aspect-square overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src =
              'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=600&fit=crop';
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
            {property.beds} Beds
          </span>
          <span className="inline-flex items-center gap-2">
            <FaBath className="text-green-600" />
            {property.baths} Baths
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            to={`/property/${property.id}`}
            className="block w-full py-2 px-4 bg-green-600 text-white text-center rounded-md hover:bg-green-700 transition-colors"
          >
            View Details
          </Link>
          <Link
            to={`/compare?ids=${property.id}`}
            className="block w-full py-2 px-4 border border-gray-200 text-gray-600 text-center rounded-md hover:border-green-500 hover:text-green-600 transition-colors"
          >
            Compare
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProperties;

