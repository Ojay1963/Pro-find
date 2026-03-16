
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import properties from '../components/propertiesData';
import FavoriteButton from '../components/FavoriteButton';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AgentReviews from '../components/AgentReviews';
import MortgageCalculator from '../components/MortgageCalculator';
import ScheduleViewingForm from '../components/ScheduleViewingForm';
import PropertyShare from '../components/PropertyShare';
import PropertyCard from '../components/PropertyCard';
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaCalendarAlt, FaCar, FaStar, FaShieldAlt, FaBolt, FaFlag, FaWhatsapp, FaChartLine, FaClipboardCheck, FaFileAlt, FaHandshake } from 'react-icons/fa';
import { storage } from '../utils/localStorage';
import { getNearbyPlaces, getNeighborhoodHighlights, getPropertyTrustMetrics, parsePriceNumber } from '../utils/propertyInsights';
import toast from 'react-hot-toast';
import { useI18n } from '../contexts/I18nContext';
import { applyFallbackImage, getPropertyGallery, getPropertyImage } from '../utils/propertyImages';

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

const inquiryActions = [
  {
    key: 'inspection',
    icon: FaClipboardCheck,
    label: 'Request inspection',
    description: 'Confirm availability and inspection requirements.'
  },
  {
    key: 'documents',
    icon: FaFileAlt,
    label: 'Ask for documents',
    description: 'Request title, survey, and supporting paperwork.'
  },
  {
    key: 'negotiation',
    icon: FaHandshake,
    label: 'Negotiate price',
    description: 'Start a pricing conversation with the agent.'
  },
  {
    key: 'siteVisit',
    icon: FaCalendarAlt,
    label: 'Book site visit',
    description: 'Pick a date and time for an in-person visit.'
  }
];


export default function PropertyDetails() {
  const { t } = useI18n();
  const { id } = useParams();
  const navigate = useNavigate();
  const storedListing = storage.getListingById(parseInt(id));
  const property = properties.find((p) => String(p.id) === String(id)) || storedListing;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [activePanel, setActivePanel] = useState(property?.badge?.toLowerCase() === 'for rent' ? 'schedule' : 'mortgage');
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
            <h2 className="text-2xl font-bold mb-4">{t('propertyDetailsPage.notFoundTitle', 'Property Not Found')}</h2>
            <Link to="/properties" className="text-green-600 hover:underline">{t('propertyDetailsPage.backToProperties', 'Back to Properties')}</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.propertyType === property.propertyType || p.location === property.location))
    .slice(0, 3);
  const galleryImages = getPropertyGallery(property);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const currentImage = galleryImages[currentImageIndex] || getPropertyImage(property);
  const neighborhoodInsights = getNeighborhoodInsights(property.location)
  const trust = getPropertyTrustMetrics(property)
  const nearbyPlaces = getNearbyPlaces(property)
  const localHighlights = getNeighborhoodHighlights(property)
  const headlinePrice = parsePriceNumber(property.price)

  const openInquiryAction = (actionKey) => {
    if (actionKey === 'siteVisit') {
      setActivePanel('schedule')
      return
    }
    const actionConfig = inquiryActions.find((item) => item.key === actionKey)
    navigate(`/property/${property.id}/contact`, {
      state: {
        inquiryType: actionKey,
        title: actionConfig?.label,
        subtitle: actionConfig?.description,
        submitLabel: actionConfig?.label
      }
    })
  }

  const handleReportListing = () => {
    if (!reportReason.trim()) {
      toast.error(t('propertyDetailsPage.report.reasonRequired', 'Add a short reason for the report.'))
      return
    }
    storage.reportListing({
      propertyId: property.id,
      propertyTitle: property.title,
      reason: reportReason.trim()
    })
    setReportReason('')
    setShowReportModal(false)
    toast.success(t('propertyDetailsPage.report.success', 'Listing report received.'))
  }

  const handlePrimaryContact = () => {
    navigate(`/property/${property.id}/contact`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
              <div className="relative aspect-[16/11] w-full bg-gray-900">
                <img
                  src={currentImage}
                  alt={property.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    applyFallbackImage(e, property, currentImageIndex);
                  }}
                />

                {galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/70"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all hover:bg-black/70"
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}

                {galleryImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                    {galleryImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 w-2 rounded-full transition-all ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}

                <div className="absolute left-4 top-4">
                  <span className="inline-block rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                    {property.badge}
                  </span>
                </div>

                <div className="absolute right-4 top-4 flex gap-2">
                  <FavoriteButton propertyId={property.id} />
                  <PropertyShare
                    propertyId={property.id}
                    propertyTitle={property.title}
                    propertyUrl={window.location.href}
                  />
                </div>
              </div>

              <div className="grid gap-5 p-5 lg:grid-cols-[1.15fr_0.85fr] lg:p-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{property.title}</h1>
                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                    <FaMapMarkerAlt />
                    <span>{property.location}</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-700">
                    <div className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-2">
                      <FaBed />
                      <span>{property.beds} {t('propertyDetailsPage.labels.beds', 'Beds')}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-2">
                      <FaBath />
                      <span>{property.baths} {t('propertyDetailsPage.labels.baths', 'Baths')}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-2">
                      <FaRulerCombined />
                      <span>{property.area}</span>
                    </div>
                    {property.yearBuilt && (
                      <div className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-2">
                        <FaCalendarAlt />
                        <span>{t('propertyDetailsPage.labels.built', 'Built')} {property.yearBuilt}</span>
                      </div>
                    )}
                    {property.parking && (
                      <div className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-2">
                        <FaCar />
                        <span>{property.parking}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl bg-green-50 p-5">
                  <div className="text-2xl font-bold text-green-600">
                    {isRental && monthlyRent()
                      ? formatAnnual(Number(String(property?.price || '').replace(/[^\d]/g, '')))
                      : property.price}
                  </div>
                  {isRental && monthlyRent() && (
                    <div className="mt-1 text-sm text-gray-700">
                      {formatMonthly(monthlyRent())}
                    </div>
                  )}
                  <p className="mt-2 text-sm text-gray-600">{t('propertyDetailsPage.labels.propertyPrice', 'Property Price')}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm">
                    <span className="rounded-full border border-green-200 bg-white px-3 py-1 text-green-700">{trust.priceBand}</span>
                    <span className="rounded-full border border-green-200 bg-white px-3 py-1 text-green-700">{trust.availability}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500">{t('propertyDetailsPage.cards.buyerInterest', 'Buyer interest')}</p>
                <p className="mt-3 text-3xl font-bold text-gray-900">{trust.inquiryIndex}%</p>
                <p className="mt-2 text-sm text-gray-600">{t('propertyDetailsPage.cards.buyerInterestText', 'Lead quality and inquiry volume remain strong around this listing.')}</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500">{t('propertyDetailsPage.cards.viewMomentum', 'View momentum')}</p>
                <p className="mt-3 text-3xl font-bold text-gray-900">{trust.viewIndex}</p>
                <p className="mt-2 text-sm text-gray-600">{t('propertyDetailsPage.cards.viewMomentumText', 'Recent shortlist and detail-page engagement estimate.')}</p>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500">{t('propertyDetailsPage.cards.expectedCloseBand', 'Expected close band')}</p>
                <p className="mt-3 text-3xl font-bold text-gray-900">{headlinePrice ? `${Math.round((headlinePrice * 0.92) / 1000000)}M+` : t('propertyDetailsPage.cards.askAgent', 'Ask agent')}</p>
                <p className="mt-2 text-sm text-gray-600">{t('propertyDetailsPage.cards.expectedCloseBandText', 'Estimated negotiation zone based on nearby pricing patterns.')}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">{t('propertyDetailsPage.description', 'Description')}</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">{t('propertyDetailsPage.features', 'Features & Amenities')}</h2>
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
              <h2 className="text-2xl font-bold mb-4">{t('propertyDetailsPage.neighborhoodInsights', 'Neighborhood Insights')}</h2>
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
              <h2 className="text-2xl font-bold mb-4">{t('propertyDetailsPage.marketPulse', 'Market Pulse')}</h2>
              <p className="text-gray-600 mb-4">
                {t('propertyDetailsPage.marketPulseText', 'Demand, price momentum, and listing velocity for this area.')}
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
              <h2 className="text-2xl font-bold mb-4">{t('propertyDetailsPage.nearbyEssentials', 'Nearby Essentials')}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {nearbyPlaces.map((item) => (
                  <div key={item.label} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-500">{item.label}</p>
                    <p className="mt-2 text-base font-semibold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{t('propertyDetailsPage.nextStep.title', 'Plan Your Next Step')}</h2>
                  <p className="mt-1 text-sm text-gray-600">{t('propertyDetailsPage.nextStep.subtitle', 'Open only what you need instead of scrolling through every form.')}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {!isRental && (
                    <button
                      type="button"
                      onClick={() => setActivePanel('mortgage')}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                        activePanel === 'mortgage'
                          ? 'bg-green-600 text-white'
                          : 'border border-gray-200 bg-white text-gray-700 hover:border-green-500 hover:text-green-700'
                      }`}
                    >
                      {t('propertyDetailsPage.nextStep.mortgage', 'Mortgage')}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setActivePanel('schedule')}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      activePanel === 'schedule'
                        ? 'bg-green-600 text-white'
                        : 'border border-gray-200 bg-white text-gray-700 hover:border-green-500 hover:text-green-700'
                    }`}
                  >
                    {t('propertyDetailsPage.nextStep.schedule', 'Schedule Viewing')}
                  </button>
                  {property.agentId && (
                    <button
                      type="button"
                      onClick={() => setActivePanel('reviews')}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                        activePanel === 'reviews'
                          ? 'bg-green-600 text-white'
                          : 'border border-gray-200 bg-white text-gray-700 hover:border-green-500 hover:text-green-700'
                      }`}
                    >
                      {t('propertyDetailsPage.nextStep.reviews', 'Agent Reviews')}
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-6">
                {activePanel === 'mortgage' && !isRental && (
                  <MortgageCalculator propertyPrice={String(property.price || '').replace(/[₦,]/g, '')} />
                )}
                {activePanel === 'schedule' && (
                  <ScheduleViewingForm
                    propertyId={property.id}
                    propertyTitle={property.title}
                    agentId={property.agentId}
                    agentName={property.agentName}
                  />
                )}
                {activePanel === 'reviews' && property.agentId && (
                  <AgentReviews agentId={property.agentId} />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 lg:sticky lg:top-24">
              <h3 className="text-lg font-bold mb-4">{t('propertyDetailsPage.quickActions', 'Quick Actions')}</h3>
              <div className="mb-4 rounded-xl border border-green-100 bg-green-50 p-4">
                <div className="flex items-center gap-2 text-green-700">
                  <FaBolt />
                  <span className="font-semibold">{trust.availability}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{trust.marketSummary}</p>
              </div>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handlePrimaryContact}
                  className="block w-full rounded-lg bg-green-600 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-green-700"
                >
                  {t('propertyDetailsPage.contact.title', 'Contact Agent')}
                </button>
                <div className="grid gap-2 sm:grid-cols-2">
                  {inquiryActions.map((action) => {
                    const Icon = action.icon
                    return (
                      <button
                        key={action.key}
                        className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 text-left transition-colors hover:border-green-500 hover:bg-green-50"
                        onClick={() => openInquiryAction(action.key)}
                        type="button"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 rounded-full bg-white p-2 text-green-700 shadow-sm">
                            <Icon />
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-gray-900">{action.label}</span>
                            <span className="mt-1 block text-xs text-gray-600">{action.description}</span>
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
                <a
                  href={`https://wa.me/2347082206013?text=${encodeURIComponent(`Hi, I am interested in ${property.title}. Please share the next step for inspection, documents, or a site visit.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 font-semibold text-gray-700 transition-colors hover:border-green-500 hover:text-green-700"
                >
                  <FaWhatsapp />
                  {t('propertyDetailsPage.whatsappDesk', 'WhatsApp Agent Desk')}
                </a>
                <button
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-3 font-semibold text-red-600 transition-colors hover:bg-red-50"
                  onClick={() => setShowReportModal(true)}
                  type="button"
                >
                  <FaFlag />
                  {t('propertyDetailsPage.report.button', 'Report listing')}
                </button>
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
                          <h4 className="text-xl font-bold text-gray-900">{t('propertyDetailsPage.report.title', 'Report this listing')}</h4>
                          <p className="mt-2 text-sm text-gray-600">{t('propertyDetailsPage.report.subtitle', 'Flag inaccurate, unavailable, duplicate, or suspicious listings for review.')}</p>
                          <textarea
                            value={reportReason}
                            onChange={(event) => setReportReason(event.target.value)}
                            rows={4}
                            className="mt-4 w-full rounded-lg border border-gray-200 p-3 outline-none focus:border-green-500"
                            placeholder={t('propertyDetailsPage.report.placeholder', 'Why are you reporting this listing?')}
                          />
                          <button
                            type="button"
                            onClick={handleReportListing}
                            className="mt-4 w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700"
                          >
                            {t('propertyDetailsPage.report.submit', 'Submit report')}
                          </button>
                        </div>
                      </div>
                    )}
              </div>
            </div>

            {/* Agent Info */}
            {property.agentName && (
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-bold mb-4">{t('propertyDetailsPage.listedBy', 'Listed by')}</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-bold">{property.agentName.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{property.agentName}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{t('propertyDetailsPage.licensedAgent', 'Licensed Agent')}</span>
                      <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                        <FaShieldAlt />
                        {t('propertyDetailsPage.verified', 'Verified')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-600">
                  <p className="rounded-md bg-green-50 border border-green-100 px-3 py-2">{t('propertyDetailsPage.trustScore', 'Trust score')}: 4.7/5</p>
                  <p className="rounded-md bg-gray-50 border border-gray-100 px-3 py-2">
                    {t('propertyDetailsPage.lastUpdated', 'Last updated')}: {property.updatedAt ? new Date(property.updatedAt).toLocaleDateString() : t('propertyDetailsPage.recently', 'Recently')}
                  </p>
                  <p className="rounded-md bg-gray-50 border border-gray-100 px-3 py-2">{t('propertyDetailsPage.responseTime', 'Typical response time')}: {t('propertyDetailsPage.responseTimeValue', 'under 2 hours')}</p>
                  <p className="rounded-md bg-gray-50 border border-gray-100 px-3 py-2 inline-flex items-center gap-2"><FaChartLine /> {t('propertyDetailsPage.highIntentZone', 'High-intent zone')}: {trust.inquiryIndex}%</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">{t('propertyDetailsPage.similarProperties', 'Similar Properties')}</h2>
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
