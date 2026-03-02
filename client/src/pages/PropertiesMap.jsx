import React, { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { DivIcon, Icon, latLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import properties from '../components/propertiesData';
import { storage } from '../utils/localStorage';

// Fix for default marker icons
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

const cityCenters = {
  lagos: [6.5244, 3.3792],
  lekki: [6.4478, 3.4788],
  ikoyi: [6.4474, 3.4422],
  ikeja: [6.6018, 3.3515],
  surulere: [6.5006, 3.3581],
  yaba: [6.5095, 3.3711],
  ajah: [6.4654, 3.5852],
  abuja: [9.0765, 7.3986],
  maitama: [9.0982, 7.4923],
  asokoro: [9.0444, 7.5342],
  garki: [9.0314, 7.4784],
  wuse: [9.0762, 7.4892],
  enugu: [6.4474, 7.5143],
  kaduna: [10.5105, 7.4165],
  ibadan: [7.3775, 3.947],
  kano: [12.0022, 8.592],
  jos: [9.8965, 8.8583],
  calabar: [4.9517, 8.322],
  uyo: [5.0377, 7.9128],
  ilorin: [8.4966, 4.5421],
  abeokuta: [7.1475, 3.3619],
  benin: [6.335, 5.6037],
  owerri: [5.4833, 7.0333],
  port: [4.8156, 7.0498],
  warri: [5.5167, 5.75],
  asaba: [6.2, 6.7333],
  onitsha: [6.147, 6.7857],
  awka: [6.21, 7.07],
  umuahia: [5.532, 7.486],
  minna: [9.6139, 6.5569],
  lokoja: [7.8023, 6.7333],
  makurdi: [7.7337, 8.5364],
  yola: [9.2035, 12.4954],
  maiduguri: [11.8333, 13.15],
  sokoto: [13.06, 5.24],
  katsina: [12.9908, 7.6006],
  bauchi: [10.3103, 9.8432],
  gombe: [10.2897, 11.1673],
  damaturu: [11.7444, 11.9608],
  jalingo: [8.8932, 11.3596],
  yenagoa: [4.9236, 6.2642],
  akure: [7.2526, 5.1931],
  aba: [5.1066, 7.3667],
  nnewi: [6.019, 6.9173],
  ph: [4.8156, 7.0498]
};

const hashString = (value) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const resolveBaseCoords = (locationText) => {
  const normalized = String(locationText || '').toLowerCase();
  for (const [key, coords] of Object.entries(cityCenters)) {
    if (normalized.includes(key)) return coords;
  }
  return [6.5244, 3.3792];
};

const getCoordinates = (location, id) => {
  const base = resolveBaseCoords(location);
  const seed = hashString(`${location}-${id}`);
  const latOffset = ((seed % 120) - 60) / 5000;
  const lngOffset = ((Math.floor(seed / 120) % 120) - 60) / 5000;
  return [base[0] + latOffset, base[1] + lngOffset];
};

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

function MapView({ properties, selectedProperty, onPropertySelect }) {
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
                  <p className="text-sm font-semibold">{group.items.length} properties in this area</p>
                  <p className="text-xs text-gray-600 mt-1">Zoom in to view individual listings.</p>
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
                  View Details
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
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [cityFilter, setCityFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchWithinBounds, setSearchWithinBounds] = useState(false);
  const [mapBounds, setMapBounds] = useState(null);

  const storedListings = storage.getListings().map((listing) => ({
    ...listing,
    image: listing.image || listing.images?.[0]?.preview || listing.images?.[0] || listing.imageUrl,
    badge: listing.badge || listing.listingType || 'For Sale'
  }));

  const dedupedProperties = useMemo(
    () => Array.from(new Map([...properties, ...storedListings].map((item) => [item.id, item])).values()),
    [storedListings]
  );

  const cities = useMemo(
    () =>
      Array.from(
        new Set(dedupedProperties.map((item) => String(item.location || '').split(',')[0].trim()).filter(Boolean))
      ).sort(),
    [dedupedProperties]
  );

  const filteredProperties = useMemo(
    () =>
      dedupedProperties.filter((property) => {
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
      }),
    [dedupedProperties, cityFilter, typeFilter, statusFilter, minPrice, maxPrice, searchWithinBounds, mapBounds]
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mt-20">
        <div className="relative h-[calc(100vh-5rem)]">
          <MapContainer center={[6.5244, 3.3792]} zoom={11} style={{ height: '100%', width: '100%' }}>
            <FitToBounds properties={filteredProperties} enabled={!searchWithinBounds} />
            <ViewportTracker onBoundsChange={setMapBounds} />
            <MapView
              properties={filteredProperties}
              selectedProperty={selectedProperty}
              onPropertySelect={setSelectedProperty}
            />
          </MapContainer>

          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm max-h-[80vh] overflow-y-auto z-[1000]">
            <h2 className="font-bold mb-1">Properties on Map</h2>
            <p className="text-xs text-gray-500 mb-3">
              {filteredProperties.length} of {dedupedProperties.length} listings
            </p>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <select
                value={cityFilter}
                onChange={(event) => setCityFilter(event.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-xs"
              >
                <option value="All">All Cities</option>
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
                <option value="All">All Types</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Land">Land</option>
                <option value="Commercial">Commercial</option>
              </select>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-xs"
              >
                <option value="All">All Status</option>
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
                <option value="Land">Land</option>
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
                Clear
              </button>

              <input
                type="number"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
                placeholder="Min price"
                className="border border-gray-300 rounded px-2 py-1 text-xs"
              />

              <input
                type="number"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                placeholder="Max price"
                className="border border-gray-300 rounded px-2 py-1 text-xs"
              />

              <label className="col-span-2 flex items-center gap-2 border border-gray-300 rounded px-2 py-1 text-xs">
                <input
                  type="checkbox"
                  checked={searchWithinBounds}
                  onChange={(event) => setSearchWithinBounds(event.target.checked)}
                />
                Search within map bounds
              </label>
            </div>

            <div className="space-y-2">
              {filteredProperties.map((property) => (
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
                  <p className="text-green-600 font-bold text-sm mt-1">{property.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
