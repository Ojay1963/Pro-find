
import React, { useEffect, useState } from 'react';
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
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaCalendarAlt, FaCar, FaStar, FaShieldAlt, FaBolt, FaFlag, FaWhatsapp, FaChartLine } from 'react-icons/fa';
import { storage } from '../utils/localStorage';
import { getNearbyPlaces, getNeighborhoodHighlights, getPropertyTrustMetrics, parsePriceNumber } from '../utils/propertyInsights';
import toast from 'react-hot-toast';

const getNeighborhoodInsights = (location) => {
  const raw = String(location || '').toLowerCase()
  if (raw.includes('lekki') || raw.includes('victoria')) {
    return [
      { label: 'Schools', value: '9.0/10' },
      { label: 'Commute', value: '34 min' },
      { label: 'Safety', value: 'High' },
      { label: 'Lifestyle', value: 'Premium' }
    ]
  }
  if (raw.includes('abuja')) {
    return [
      { label: 'Schools', value: '8.7/10' },
      { label: 'Commute', value: '28 min' },
      { label: 'Safety', value: 'High' },
      { label: 'Lifestyle', value: 'Balanced' }
    ]
  }
  return [
    { label: 'Schools', value: '8.2/10' },
    { label: 'Commute', value: '31 min' },
    { label: 'Safety', value: 'Good' },
    { label: 'Lifestyle', value: 'Vibrant' }
  ]
}


export default function PropertyDetails() {
  const { id } = useParams();
  const storedListing = storage.getListingById(parseInt(id));
  const property = properties.find((p) => String(p.id) === String(id)) || storedListing;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const isRental = property?.badge?.toLowerCase() === 'for rent';
  const tours = storage.getPropertyMedia(property?.id);

  const formatNaira = (value) =>
    `₦${Number(value || 0).toLocaleString('en-NG')}`;

  const formatAnnual = (value) => `${formatNaira(value)} / year`;
  const formatMonthly = (value) => `${formatNaira(value)} / month`;

  const monthlyRent = () => {
    const annual = Number(String(property?.price || '').replace(/[^\d]/g, ''));
    if (!annual) return null;
    return Math.round(annual / 12);
  };

  useEffect(() => {
    if (!property?.id) return
    storage.addRecentlyViewed(property.id)
    storage.trackListingView(property.id)
    void storage.trackEvent('property_viewed', {
      propertyId: property.id,
      location: property.location,
      propertyType: property.propertyType || ''
    })
  }, [property?.id, property?.location, property?.propertyType])

  useEffect(() => {
    const title = `${property.title} | Profind`
    const previousTitle = document.title
    document.title = title

    const descriptionText = `${property.title} in ${property.location}. ${property.beds || 0} beds, ${property.baths || 0} baths.`
    let descriptionTag = document.querySelector('meta[name="description"]')
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta')
      descriptionTag.setAttribute('name', 'description')
      document.head.appendChild(descriptionTag)
    }
    const previousDescription = descriptionTag.getAttribute('content') || ''
    descriptionTag.setAttribute('content', descriptionText)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', window.location.href)

    const ldId = 'property-ld-json'
    const script = document.createElement('script')
    script.id = ldId
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Residence',
      name: property.title,
      description: property.description,
      address: {
        '@type': 'PostalAddress',
        addressLocality: property.location
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'NGN',
        price: Number(String(property.price || '').replace(/[^\d]/g, '')) || 0,
        availability: 'https://schema.org/InStock'
      }
    })
    document.head.appendChild(script)

    return () => {
      document.title = previousTitle
      descriptionTag?.setAttribute('content', previousDescription)
      document.getElementById(ldId)?.remove()
    }
  }, [property])

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

  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.propertyType === property.propertyType || p.location === property.location))
    .slice(0, 3);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (property.images?.length || 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + (property.images?.length || 1)) % (property.images?.length || 1));
  };

  const resolveImage = (img) => (img?.preview || img?.url || img);
  const currentImage = resolveImage(property.images?.[currentImageIndex]) || property.image;
  const neighborhoodInsights = getNeighborhoodInsights(property.location)
  const trust = getPropertyTrustMetrics(property)
  const nearbyPlaces = getNearbyPlaces(property)
  const localHighlights = getNeighborhoodHighlights(property)
  const headlinePrice = parsePriceNumber(property.price)

  const handleReportListing = () => {
    if (!reportReason.trim()) {
      toast.error('Add a short reason for the report.')
      return
    }
    storage.reportListing({
      propertyId: property.id,
      propertyTitle: property.title,
      reason: reportReason.trim()
    })
    setReportReason('')
    setShowReportModal(false)
    toast.success('Listing report received.')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Image Gallery */}
      <div className="relative w-full max-w-[600px] aspect-square bg-gray-900 mx-auto">
        <img
          src={currentImage}
          alt={property.title}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
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
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <span className="rounded-full border border-green-200 bg-white px-3 py-1 text-green-700">{trust.formattedPricePerSqm}</span>
                <span className="rounded-full border border-green-200 bg-white px-3 py-1 text-green-700">{trust.priceBand}</span>
                <span className="rounded-full border border-green-200 bg-white px-3 py-1 text-green-700">{trust.availability}</span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Buyer interest</p>
                <p className="mt-3 text-3xl font-bold text-gray-900">{trust.inquiryIndex}%</p>
                <p className="mt-2 text-sm text-gray-600">Lead quality and inquiry volume remain strong around this listing.</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500">View momentum</p>
                <p className="mt-3 text-3xl font-bold text-gray-900">{trust.viewIndex}</p>
                <p className="mt-2 text-sm text-gray-600">Recent shortlist and detail-page engagement estimate.</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Expected close band</p>
                <p className="mt-3 text-3xl font-bold text-gray-900">{headlinePrice ? `${Math.round((headlinePrice * 0.92) / 1000000)}M+` : 'Ask agent'}</p>
                <p className="mt-2 text-sm text-gray-600">Estimated negotiation zone based on nearby pricing patterns.</p>
              </div>
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
                {neighborhoodInsights.map((item) => (
                  <div key={item.label} className="rounded-xl bg-green-50 border border-emerald-100 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{item.label}</p>
                    <p className="text-lg font-semibold text-gray-900 mt-2">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {localHighlights.map((item) => (
                  <span key={item} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                    {item}
                  </span>
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

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold mb-4">Nearby Essentials</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {nearbyPlaces.map((item) => (
                  <div key={item.label} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-500">{item.label}</p>
                    <p className="mt-2 text-base font-semibold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Virtual Tours */}
            <VirtualTour
              propertyId={property.id}
              tours={property.virtualTours || tours || []}
            />

            {/* Mortgage */}
            {!isRental && (
              <MortgageCalculator propertyPrice={String(property.price || '').replace(/[₦,]/g, '')} />
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
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 lg:sticky lg:top-24">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="mb-4 rounded-xl border border-green-100 bg-green-50 p-4">
                <div className="flex items-center gap-2 text-green-700">
                  <FaBolt />
                  <span className="font-semibold">{trust.availability}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{trust.marketSummary}</p>
              </div>
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
                <a
                  href={`https://wa.me/2347082206013?text=${encodeURIComponent(`Hi, I want details about ${property.title}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 font-semibold text-gray-700 transition-colors hover:border-green-500 hover:text-green-700"
                >
                  <FaWhatsapp />
                  WhatsApp Agent Desk
                </a>
                <button
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-3 font-semibold text-red-600 transition-colors hover:bg-red-50"
                  onClick={() => setShowReportModal(true)}
                  type="button"
                >
                  <FaFlag />
                  Report listing
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
                    {showReportModal && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
                        <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                          <button
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
                            onClick={() => setShowReportModal(false)}
                            aria-label="Close report modal"
                          >
                            &times;
                          </button>
                          <h4 className="text-xl font-bold text-gray-900">Report this listing</h4>
                          <p className="mt-2 text-sm text-gray-600">Flag inaccurate, unavailable, duplicate, or suspicious listings for review.</p>
                          <textarea
                            value={reportReason}
                            onChange={(event) => setReportReason(event.target.value)}
                            rows={4}
                            className="mt-4 w-full rounded-lg border border-gray-200 p-3 outline-none focus:border-green-500"
                            placeholder="Why are you reporting this listing?"
                          />
                          <button
                            type="button"
                            onClick={handleReportListing}
                            className="mt-4 w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700"
                          >
                            Submit report
                          </button>
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
                <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-600">
                  <p className="rounded-md bg-green-50 border border-green-100 px-3 py-2">Trust score: 4.7/5</p>
                  <p className="rounded-md bg-gray-50 border border-gray-100 px-3 py-2">
                    Last updated: {property.updatedAt ? new Date(property.updatedAt).toLocaleDateString() : 'Recently'}
                  </p>
                  <p className="rounded-md bg-gray-50 border border-gray-100 px-3 py-2">Typical response time: under 2 hours</p>
                  <p className="rounded-md bg-gray-50 border border-gray-100 px-3 py-2 inline-flex items-center gap-2"><FaChartLine /> High-intent zone: {trust.inquiryIndex}%</p>
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
