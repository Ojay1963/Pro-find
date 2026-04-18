import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { DivIcon, Icon, latLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import properties from '../components/propertiesData';
import { storage } from '../utils/localStorage';
import { attachDistanceToProperty, getCoordinates } from '../utils/propertyLocation';
import { getPropertyTrustMetrics } from '../utils/propertyInsights';
import { useI18n } from '../contexts/I18nContext';

// Fix for default marker icons
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

const parsePrice = (value) => Number(String(value || '').replace(/[^\d]/g, '')) || 0;
const mobileSheetHeights = {
  peek: '11rem',
  half: '42vh',
  full: '72vh'
};

const createClusterIcon = (count) =>
  new DivIcon({
    className: 'custom-cluster-icon',
    html: `<div style="background:#2563eb;color:#fff;border:2px solid #fff;width:36px;height:36px;border-radius:9999px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;box-shadow:0 2px 8px rgba(0,0,0,0.25);">${count}</div>`,
    iconSize: [36, 36]
  });

const clusterPoints = (items, zoom) => {
  if (zoom >= 12) return items.map((item) => ({ type: 'single', center: item.coords, items: [item] }));
  const precision = zoom < 8 ? 2 : zoom < 10 ? 3 : 4;
  const buckets = new Map();
  items.forEach((item) => {
    const key = `${item.coords[0].toFixed(precision)}:${item.coords[1].toFixed(precision)}`;
    const list = buckets.get(key) || [];
    list.push(item);
    buckets.set(key, list);
  });
  return Array.from(buckets.values()).map((group) => {
    const lat = group.reduce((sum, item) => sum + item.coords[0], 0) / group.length;
    const lng = group.reduce((sum, item) => sum + item.coords[1], 0) / group.length;
    return { type: group.length > 1 ? 'cluster' : 'single', center: [lat, lng], items: group };
  });
};

function FitToBounds({ properties, enabled }) {
  const map = useMap();
  useEffect(() => {
    if (!enabled) return;
    if (!properties.length) return;
    const bounds = latLngBounds(properties.map((item) => getCoordinates(item.location, item.id)));
    map.fitBounds(bounds.pad(0.12), { maxZoom: 13 });
  }, [properties, map, enabled]);
  return null;
}

function FitToClosestProperties({ properties, userLocation, enabled }) {
  const map = useMap();

  useEffect(() => {
    if (!enabled) return;
    if (!Array.isArray(userLocation)) return;
    if (!properties.length) return;

    const nearest = [...properties]
      .sort((left, right) => {
        const distanceA = typeof left.distanceKm === 'number' ? left.distanceKm : Number.POSITIVE_INFINITY;
        const distanceB = typeof right.distanceKm === 'number' ? right.distanceKm : Number.POSITIVE_INFINITY;
        return distanceA - distanceB;
      })
      .slice(0, 8);

    const bounds = latLngBounds([
      userLocation,
      ...nearest.map((item) => item.coords || getCoordinates(item.location, item.id))
    ]);

    map.fitBounds(bounds.pad(0.18), { maxZoom: 12 });
  }, [enabled, map, properties, userLocation]);

  return null;
}

function ViewportTracker({ onBoundsChange }) {
  const map = useMap();
  useEffect(() => {
    const bounds = map.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    onBoundsChange({ sw: [sw.lat, sw.lng], ne: [ne.lat, ne.lng] });
  }, [map, onBoundsChange]);

  useMapEvents({
    moveend: (event) => {
      const bounds = event.target.getBounds();
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();
      onBoundsChange({ sw: [sw.lat, sw.lng], ne: [ne.lat, ne.lng] });
    },
    zoomend: (event) => {
      const bounds = event.target.getBounds();
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();
      onBoundsChange({ sw: [sw.lat, sw.lng], ne: [ne.lat, ne.lng] });
    }
  });

  return null;
}

function MapView({ properties, selectedProperty, onPropertySelect, userLocation, t }) {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());

  useMapEvents({
    zoomend: () => setZoom(map.getZoom())
  });

  useEffect(() => {
    if (!selectedProperty) return;
    const coords = getCoordinates(selectedProperty.location, selectedProperty.id);
    const currentCenter = map.getCenter();
    const currentZoom = map.getZoom();
    const isAlreadyFocused =
      Math.abs(currentCenter.lat - coords[0]) < 0.0005 &&
      Math.abs(currentCenter.lng - coords[1]) < 0.0005 &&
      currentZoom >= 13;

    if (isAlreadyFocused) return;
    map.flyTo(coords, Math.max(currentZoom, 13), { duration: 0.35 });
  }, [selectedProperty, map]);

  const points = properties.map((property) => ({
    ...property,
    coords: getCoordinates(property.location, property.id)
  }));
  const groups = clusterPoints(points, zoom);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {userLocation ? (
        <Marker position={userLocation}>
          <Popup>
            <div className="p-2">
              <p className="text-sm font-semibold">{t('propertiesMapPage.yourLocation', 'Your location')}</p>
              <p className="text-xs text-gray-600 mt-1">{t('propertiesMapPage.yourLocationText', 'Nearby properties are ranked from here.')}</p>
            </div>
          </Popup>
        </Marker>
      ) : null}
      {groups.map((group, idx) => {
        if (group.type === 'cluster') {
          return (
            <Marker
              key={`cluster-${idx}`}
              position={group.center}
              icon={createClusterIcon(group.items.length)}
              eventHandlers={{
                click: () => map.setView(group.center, Math.min(map.getZoom() + 2, 15))
              }}
            >
              <Popup>
                <div className="p-2">
                  <p className="text-sm font-semibold">
                    {t('propertiesMapPage.clusterTitle', '{count} properties in this area').replace('{count}', String(group.items.length))}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{t('propertiesMapPage.clusterText', 'Zoom in to view individual listings.')}</p>
                </div>
              </Popup>
            </Marker>
          );
        }

        const property = group.items[0];
        return (
          <Marker
            key={property.id}
            position={group.center}
            eventHandlers={{ click: () => onPropertySelect(property) }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-sm mb-1">{property.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{property.location}</p>
                <p className="text-green-600 font-bold text-sm mb-2">{property.price}</p>
                <Link to={`/property/${property.id}`} className="text-blue-600 text-xs hover:underline">
                  {t('propertiesMapPage.viewDetails', 'View Details')}
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default function PropertiesMap() {
  const { t } = useI18n();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [cityFilter, setCityFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchWithinBounds, setSearchWithinBounds] = useState(false);
  const [mapBounds, setMapBounds] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [isMobileSheet, setIsMobileSheet] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 1023px)').matches : false
  );
  const [sheetMode, setSheetMode] = useState('half');
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartYRef = useRef(0);
  const hasActiveDragRef = useRef(false);
  const hasActiveLocation = Array.isArray(userLocation) && userLocation.length === 2;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const syncMobileSheet = (event) => {
      setIsMobileSheet(event.matches);
      if (!event.matches) {
        setSheetMode('half');
        setDragOffset(0);
      }
    };

    syncMobileSheet(mediaQuery);
    mediaQuery.addEventListener('change', syncMobileSheet);

    return () => mediaQuery.removeEventListener('change', syncMobileSheet);
  }, []);

  useEffect(() => {
    if (selectedProperty && isMobileSheet) {
      setSheetMode('half');
    }
  }, [selectedProperty, isMobileSheet]);

  const storedListings = storage.getListings().map((listing) => ({
    ...listing,
    image: listing.image || listing.images?.[0]?.preview || listing.images?.[0] || listing.imageUrl,
    badge: listing.badge || listing.listingType || 'For Sale'
  }));

  const dedupedProperties = useMemo(
    () => Array.from(new Map([...properties, ...storedListings].map((item) => [item.id, item])).values()),
    [storedListings]
  );

  const propertiesWithDistance = useMemo(
    () => dedupedProperties.map((property) => attachDistanceToProperty(property, hasActiveLocation ? userLocation : null)),
    [dedupedProperties, hasActiveLocation, userLocation]
  );

  const cities = useMemo(
    () =>
      Array.from(
        new Set(dedupedProperties.map((item) => String(item.location || '').split(',')[0].trim()).filter(Boolean))
      ).sort(),
    [dedupedProperties]
  );

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setUserLocation(null);
      setLocationError('Geolocation is not supported in this browser.');
      return;
    }

    setIsLocating(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setUserLocation([coords.latitude, coords.longitude]);
        setLocationError('');
        setIsLocating(false);
      },
      (error) => {
        setUserLocation(null);
        setLocationError(error.message || 'Unable to access your location.');
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const filteredProperties = useMemo(
    () =>
      propertiesWithDistance
        .filter((property) => {
        const city = String(property.location || '').split(',')[0].trim();
        const type = String(property.propertyType || '');
        const status = String(property.badge || '');
        const price = parsePrice(property.price);
        if (cityFilter !== 'All' && city !== cityFilter) return false;
        if (typeFilter !== 'All' && type !== typeFilter) return false;
        if (statusFilter !== 'All' && status !== statusFilter) return false;
        if (minPrice && price < Number(minPrice)) return false;
        if (maxPrice && price > Number(maxPrice)) return false;
        if (searchWithinBounds && mapBounds?.sw && mapBounds?.ne) {
          const [lat, lng] = getCoordinates(property.location, property.id);
          const [swLat, swLng] = mapBounds.sw;
          const [neLat, neLng] = mapBounds.ne;
          if (lat < swLat || lat > neLat || lng < swLng || lng > neLng) return false;
        }
        return true;
      })
        .sort((a, b) => {
          if (!hasActiveLocation) {
            return 0;
          }

          const distanceA = typeof a.distanceKm === 'number' ? a.distanceKm : Number.POSITIVE_INFINITY;
          const distanceB = typeof b.distanceKm === 'number' ? b.distanceKm : Number.POSITIVE_INFINITY;
          return distanceA - distanceB;
        }),
    [propertiesWithDistance, cityFilter, typeFilter, statusFilter, minPrice, maxPrice, searchWithinBounds, mapBounds, hasActiveLocation]
  );

  const handleSheetTouchStart = (event) => {
    if (!isMobileSheet) return;
    touchStartYRef.current = event.touches[0]?.clientY || 0;
    hasActiveDragRef.current = true;
    setDragOffset(0);
  };

  const handleSheetTouchMove = (event) => {
    if (!isMobileSheet || !hasActiveDragRef.current) return;
    const currentY = event.touches[0]?.clientY || 0;
    const nextOffset = currentY - touchStartYRef.current;
    setDragOffset(nextOffset);
  };

  const handleSheetTouchEnd = () => {
    if (!isMobileSheet || !hasActiveDragRef.current) return;
    const threshold = 48;
    if (dragOffset <= -threshold) {
      setSheetMode((current) => (current === 'peek' ? 'half' : 'full'));
    } else if (dragOffset >= threshold) {
      setSheetMode((current) => (current === 'full' ? 'half' : 'peek'));
    }
    hasActiveDragRef.current = false;
    setDragOffset(0);
  };

  const toggleSheetMode = () => {
    if (!isMobileSheet) return;
    setSheetMode((current) => {
      if (current === 'peek') return 'half';
      if (current === 'half') return 'full';
      return 'peek';
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="relative h-[calc(100dvh-4.75rem)] lg:h-[calc(100vh-5rem)]">
          <MapContainer center={[6.5244, 3.3792]} zoom={11} style={{ height: '100%', width: '100%' }}>
            <FitToBounds properties={filteredProperties} enabled={!searchWithinBounds && !selectedProperty} />
            <FitToClosestProperties
              properties={filteredProperties}
              userLocation={hasActiveLocation ? userLocation : null}
              enabled={hasActiveLocation && !selectedProperty}
            />
            <ViewportTracker onBoundsChange={setMapBounds} />
            <MapView
              properties={filteredProperties}
              selectedProperty={selectedProperty}
              onPropertySelect={setSelectedProperty}
              userLocation={hasActiveLocation ? userLocation : null}
              t={t}
            />
          </MapContainer>

          <div
            className="properties-map-panel absolute left-4 right-4 bottom-[calc(5.8rem+env(safe-area-inset-bottom,0px))] z-40 flex flex-col overflow-hidden rounded-[1.7rem] bg-white shadow-lg transition-[height,transform] duration-200 ease-out md:right-auto md:top-4 md:bottom-auto md:max-h-[80vh] md:max-w-sm md:rounded-lg md:z-[1000]"
            style={{
              height: isMobileSheet ? mobileSheetHeights[sheetMode] : undefined,
              maxHeight: isMobileSheet ? undefined : '80vh',
              transform: isMobileSheet ? `translateY(${Math.min(Math.max(dragOffset, -120), 120)}px)` : undefined
            }}
          >
            <div
              className="properties-map-panel__header border-b border-slate-200/80 px-4 pb-3 pt-3 md:border-b-0"
              onClick={toggleSheetMode}
              onTouchStart={handleSheetTouchStart}
              onTouchMove={handleSheetTouchMove}
              onTouchEnd={handleSheetTouchEnd}
            >
              <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-slate-300 md:hidden" />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold mb-1">{t('propertiesMapPage.panelTitle', 'Properties on Map')}</h2>
                  <p className="text-xs text-gray-500">
                    {t('propertiesMapPage.panelCount', '{visible} of {total} listings')
                      .replace('{visible}', String(filteredProperties.length))
                      .replace('{total}', String(propertiesWithDistance.length))}
                  </p>
                </div>
                <button
                  type="button"
                  className="hidden rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 md:inline-flex"
                  onClick={toggleSheetMode}
                >
                  {sheetMode === 'full' ? t('propertiesMapPage.collapse', 'Collapse') : t('propertiesMapPage.expand', 'Expand')}
                </button>
              </div>
            </div>

            <div className="properties-map-panel__content flex-1 overflow-y-auto px-4 pb-4">
              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  disabled={isLocating}
                  className="mb-3 w-full rounded-2xl border border-green-200 px-3 py-2.5 text-sm font-medium text-green-700 hover:bg-green-50 disabled:opacity-60"
                >
                  {isLocating
                    ? t('propertiesMapPage.findingLocation', 'Finding your location...')
                    : t('propertiesMapPage.showClosest', 'Show closest to me')}
                </button>
                {locationError ? <p className="mb-3 text-xs text-red-600">{locationError}</p> : null}
                {hasActiveLocation ? <p className="mb-3 text-xs text-green-700">{t('propertiesMapPage.sortedByDistance', 'Listings are sorted by distance from your current location.')}</p> : null}
                {!hasActiveLocation ? (
                  <p className="mb-3 text-xs text-gray-500">
                    {t(
                      'propertiesMapPage.locationHelp',
                      'Allow location access to rank properties by distance. If permission is denied, you can still filter by city, price, and type.'
                    )}
                  </p>
                ) : null}
              </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <select
                value={cityFilter}
                onChange={(event) => setCityFilter(event.target.value)}
                className="rounded-xl border border-gray-300 px-2 py-2 text-xs"
              >
                <option value="All">{t('propertiesMapPage.allCities', 'All Cities')}</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              <select
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
                className="rounded-xl border border-gray-300 px-2 py-2 text-xs"
              >
                <option value="All">{t('propertiesMapPage.allTypes', 'All Types')}</option>
                <option value="House">{t('propertiesPage.search.house', 'House')}</option>
                <option value="Apartment">{t('propertiesPage.search.apartment', 'Apartment')}</option>
                <option value="Land">{t('propertiesPage.search.land', 'Land')}</option>
                <option value="Commercial">{t('propertiesPage.search.commercial', 'Commercial')}</option>
              </select>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-xl border border-gray-300 px-2 py-2 text-xs"
              >
                <option value="All">{t('propertiesMapPage.allStatus', 'All Status')}</option>
                <option value="For Sale">{t('propertiesPage.search.forSale', 'For Sale')}</option>
                <option value="For Rent">{t('propertiesPage.search.forRent', 'For Rent')}</option>
                <option value="Land">{t('propertiesPage.search.land', 'Land')}</option>
              </select>

              <button
                type="button"
                onClick={() => {
                  setCityFilter('All');
                  setTypeFilter('All');
                  setStatusFilter('All');
                  setMinPrice('');
                  setMaxPrice('');
                  setSearchWithinBounds(false);
                }}
                className="rounded-xl border border-gray-300 px-2 py-2 text-xs hover:bg-gray-50"
              >
                {t('propertiesMapPage.clear', 'Clear')}
              </button>

              <input
                type="number"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
                placeholder={t('propertiesMapPage.minPrice', 'Min price')}
                className="rounded-xl border border-gray-300 px-2 py-2 text-xs"
              />

              <input
                type="number"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                placeholder={t('propertiesMapPage.maxPrice', 'Max price')}
                className="rounded-xl border border-gray-300 px-2 py-2 text-xs"
              />

              <label className="col-span-2 flex items-center gap-2 rounded-xl border border-gray-300 px-2 py-2 text-xs">
                <input
                  type="checkbox"
                  checked={searchWithinBounds}
                  onChange={(event) => setSearchWithinBounds(event.target.checked)}
                />
                {t('propertiesMapPage.searchWithinBounds', 'Search within map bounds')}
              </label>
            </div>

            <div className="space-y-2">
              {filteredProperties.map((property) => (
                (() => {
                  const trust = getPropertyTrustMetrics(property);
                  return (
                <div
                  key={property.id}
                  onClick={() => {
                    setSelectedProperty(property);
                    if (isMobileSheet) {
                      setSheetMode('half');
                    }
                  }}
                  className={`cursor-pointer rounded-2xl border p-3 transition-colors ${
                    selectedProperty?.id === property.id
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <h3 className="font-semibold text-sm">{property.title}</h3>
                  <p className="text-xs text-gray-600">{property.location}</p>
                  {property.distanceLabel ? <p className="text-xs text-blue-600 mt-1">{property.distanceLabel}</p> : null}
                  <div className="mt-2 flex flex-wrap gap-1 text-[11px]">
                    <span className="rounded-full bg-green-50 px-2 py-1 text-green-700">{trust.availability}</span>
                  </div>
                  <p className="text-green-600 font-bold text-sm mt-1">{property.price}</p>
                </div>
                  );
                })()
              ))}
            </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
