import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import properties from '../components/propertiesData';
import { Link } from 'react-router-dom';

// Fix for default marker icons
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Mock coordinates for Nigerian cities (in real app, use geocoding API)
const locationCoordinates = {
  'Lekki, Lagos': [6.4550, 3.3941],
  'Banana Island, Lagos': [6.4281, 3.4219],
  'Gwarinpa, Abuja': [9.0765, 7.3986],
  'Victoria Island, Lagos': [6.4281, 3.4219],
  'Ikoyi, Lagos': [6.4489, 3.4246],
  'Independence Layout, Enugu': [6.4474, 7.5143],
};

// Get coordinates for a location (fallback to Lagos if not found)
const getCoordinates = (location) => {
  for (const [key, coords] of Object.entries(locationCoordinates)) {
    if (location.includes(key.split(',')[0])) {
      return coords;
    }
  }
  return [6.5244, 3.3792]; // Default to Lagos
};

function MapView({ properties, selectedProperty, onPropertySelect }) {
  const map = useMap();

  useEffect(() => {
    if (selectedProperty) {
      const coords = getCoordinates(selectedProperty.location);
      map.setView(coords, 13);
    }
  }, [selectedProperty, map]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties.map((property) => {
        const coords = getCoordinates(property.location);
        return (
          <Marker
            key={property.id}
            position={coords}
            eventHandlers={{
              click: () => onPropertySelect(property),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-sm mb-1">{property.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{property.location}</p>
                <p className="text-green-600 font-bold text-sm mb-2">{property.price}</p>
                <Link
                  to={`/property/${property.id}`}
                  className="text-blue-600 text-xs hover:underline"
                >
                  View Details →
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
  const [mapCenter] = useState([6.5244, 3.3792]); // Lagos, Nigeria

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mt-20">
        <div className="relative h-[calc(100vh-5rem)]">
          <MapContainer
            center={mapCenter}
            zoom={11}
            style={{ height: '100%', width: '100%' }}
          >
            <MapView
              properties={properties}
              selectedProperty={selectedProperty}
              onPropertySelect={setSelectedProperty}
            />
          </MapContainer>
          
          {/* Property List Overlay */}
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm max-h-[80vh] overflow-y-auto z-[1000]">
            <h2 className="font-bold mb-3">Properties on Map</h2>
            <div className="space-y-2">
              {properties.slice(0, 10).map((property) => (
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
