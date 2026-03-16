import React, { useEffect, useMemo, useState } from 'react';
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

function RecenterToUser({ userLocation }) {
  const map = useMap();

  useEffect(() => {
    if (!userLocation) return;
    map.setView(userLocation, 12);
  }, [map, userLocation]);

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
    map.setView(coords, 13);
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
  const hasActiveLocation = Array.isArray(userLocation) && userLocation.length === 2;

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mt-20">
        <div className="relative h-[calc(100vh-5rem)]">
          <MapContainer center={[6.5244, 3.3792]} zoom={11} style={{ height: '100%', width: '100%' }}>
            <FitToBounds properties={filteredProperties} enabled={!searchWithinBounds} />
            <RecenterToUser userLocation={hasActiveLocation ? userLocation : null} />
            <ViewportTracker onBoundsChange={setMapBounds} />
            <MapView
              properties={filteredProperties}
              selectedProperty={selectedProperty}
              onPropertySelect={setSelectedProperty}
              userLocation={hasActiveLocation ? userLocation : null}
              t={t}
            />
          </MapContainer>

          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm max-h-[80vh] overflow-y-auto z-[1000]">
            <h2 className="font-bold mb-1">{t('propertiesMapPage.panelTitle', 'Properties on Map')}</h2>
            <p className="text-xs text-gray-500 mb-3">
              {t('propertiesMapPage.panelCount', '{visible} of {total} listings')
                .replace('{visible}', String(filteredProperties.length))
                .replace('{total}', String(propertiesWithDistance.length))}
            </p>
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={isLocating}
              className="mb-3 w-full rounded border border-green-200 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-50 disabled:opacity-60"
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

            <div className="grid grid-cols-2 gap-2 mb-3">
              <select
                value={cityFilter}
                onChange={(event) => setCityFilter(event.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-xs"
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
                className="border border-gray-300 rounded px-2 py-1 text-xs"
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
                className="border border-gray-300 rounded px-2 py-1 text-xs"
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
                className="border border-gray-300 rounded px-2 py-1 text-xs hover:bg-gray-50"
              >
                {t('propertiesMapPage.clear', 'Clear')}
              </button>

              <input
                type="number"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
                placeholder={t('propertiesMapPage.minPrice', 'Min price')}
                className="border border-gray-300 rounded px-2 py-1 text-xs"
              />

              <input
                type="number"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                placeholder={t('propertiesMapPage.maxPrice', 'Max price')}
                className="border border-gray-300 rounded px-2 py-1 text-xs"
              />

              <label className="col-span-2 flex items-center gap-2 border border-gray-300 rounded px-2 py-1 text-xs">
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
                  onClick={() => setSelectedProperty(property)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
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
      </main>
      <Footer />
    </div>
  );
}
