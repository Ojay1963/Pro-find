
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import properties from '../components/propertiesData';
import FavoriteButton from '../components/FavoriteButton';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VirtualTour from '../components/VirtualTour';
import AgentReviews from '../components/AgentReviews';
import MortgageCalculator from '../components/MortgageCalculator';
import ScheduleViewingForm from '../components/ScheduleViewingForm';
import ContactAgentForm from '../components/ContactAgentForm';
import PropertyShare from '../components/PropertyShare';
import PropertyCard from '../components/PropertyCard';
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaCalendarAlt, FaCar, FaStar, FaShieldAlt } from 'react-icons/fa';


export default function PropertyDetails() {
  const { id } = useParams();
  const property = properties.find((p) => String(p.id) === String(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const isRental = property?.badge?.toLowerCase() === 'for rent';

  const formatNaira = (value) =>
    `₦${Number(value || 0).toLocaleString('en-NG')}`;

  const formatAnnual = (value) => `${formatNaira(value)} / year`;
  const formatMonthly = (value) => `${formatNaira(value)} / month`;

  const monthlyRent = () => {
    const annual = Number(String(property?.price || '').replace(/[^\d]/g, ''));
    if (!annual) return null;
    return Math.round(annual / 12);
  };

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
            <Link to="/properties" className="text-green-600 hover:underline">Back to Properties</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Get similar properties (same type and location area)
  const similarProperties = properties
    .filter(p => p.id !== property.id && p.propertyType === property.propertyType)
    .slice(0, 3);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (property.images?.length || 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + (property.images?.length || 1)) % (property.images?.length || 1));
  };

  const currentImage = property.images?.[currentImageIndex] || property.image;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Image Gallery */}
      <div className="relative w-full max-w-[600px] aspect-square bg-gray-900 mx-auto">
        <img
          src={currentImage}
          alt={property.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=600&fit=crop`;
          }}
        />

        {/* Navigation Arrows */}
        {(property.images?.length > 1) && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
            >
              <FaChevronRight />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {property.images?.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Property Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
            {property.badge}
          </span>
        </div>

        {/* Favorite and Share Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <FavoriteButton propertyId={property.id} />
          <PropertyShare
            propertyId={property.id}
            propertyTitle={property.title}
            propertyUrl={window.location.href}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Header */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{property.title}</h1>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <FaMapMarkerAlt />
                <span>{property.location}</span>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-gray-700">
                <div className="flex items-center gap-2">
                  <FaBed />
                  <span>{property.beds} Beds</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBath />
                  <span>{property.baths} Baths</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRulerCombined />
                  <span>{property.area}</span>
                </div>
                {property.yearBuilt && (
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt />
                    <span>Built {property.yearBuilt}</span>
                  </div>
                )}
                {property.parking && (
                  <div className="flex items-center gap-2">
                    <FaCar />
                    <span>{property.parking}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {isRental && monthlyRent()
                  ? formatAnnual(Number(String(property?.price || '').replace(/[^\d]/g, '')))
                  : property.price}
              </div>
              {isRental && monthlyRent() && (
                <div className="text-lg text-gray-700">
                  {formatMonthly(monthlyRent())}
                </div>
              )}
              <p className="text-gray-600">Property Price</p>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FaStar className="text-green-600 text-sm" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Neighborhood Insights */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold mb-4">Neighborhood Insights</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Schools', value: '8.4/10' },
                  { label: 'Commute', value: '25 min' },
                  { label: 'Safety', value: 'High' },
                  { label: 'Lifestyle', value: 'Vibrant' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-green-50 border border-emerald-100 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{item.label}</p>
                    <p className="text-lg font-semibold text-gray-900 mt-2">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Pulse */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold mb-4">Market Pulse</h2>
              <p className="text-gray-600 mb-4">
                Demand, price momentum, and listing velocity for this area.
              </p>
              <div className="space-y-3">
                {[
                  { label: 'Demand', value: 78 },
                  { label: 'Price momentum', value: 64 },
                  { label: 'Listing velocity', value: 71 },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>{bar.label}</span>
                      <span>{bar.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full bg-green-600 rounded-full"
                        style={{ width: `${bar.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Virtual Tours */}
            <VirtualTour
              propertyId={property.id}
              tours={property.virtualTours || []}
            />

            {/* Mortgage */}
            {!isRental && (
              <MortgageCalculator propertyPrice={property.price.replace(/[₦,]/g, '')} />
            )}

            {/* Schedule Viewing */}
            <ScheduleViewingForm
              propertyId={property.id}
              propertyTitle={property.title}
              agentId={property.agentId}
              agentName={property.agentName}
            />

            {/* Contact Agent */}
            <ContactAgentForm
              propertyId={property.id}
              propertyTitle={property.title}
              agentName={property.agentName}
              agentId={property.agentId}
            />

            {/* Agent Reviews */}
            {property.agentId && (
              <AgentReviews agentId={property.agentId} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/contact"
                  className="block w-full bg-green-600 text-white text-center px-4 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Contact Agent
                </Link>
                <button
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  onClick={() => setShowContactModal(true)}
                  type="button"
                >
                  Request More Info
                </button>
                    {/* Contact Agent Modal for Request More Info */}
                    {showContactModal && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative">
                          <button
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
                            onClick={() => setShowContactModal(false)}
                            aria-label="Close"
                          >
                            &times;
                          </button>
                          <ContactAgentForm
                            propertyId={property.id}
                            propertyTitle={property.title}
                            agentName={property.agentName}
                            agentId={property.agentId}
                          />
                        </div>
                      </div>
                    )}
              </div>
            </div>

            {/* Agent Info */}
            {property.agentName && (
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-bold mb-4">Listed by</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-bold">{property.agentName.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{property.agentName}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Licensed Agent</span>
                      <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                        <FaShieldAlt />
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((similarProperty) => (
                <PropertyCard key={similarProperty.id} property={similarProperty} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
