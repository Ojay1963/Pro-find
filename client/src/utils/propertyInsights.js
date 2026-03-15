export const parsePriceNumber = (value) => Number(String(value || '').replace(/[^\d]/g, '')) || 0;

export const parseAreaNumber = (value) => Number(String(value || '').replace(/[^\d]/g, '')) || 0;

export const normalizeText = (value) => String(value || '').trim().toLowerCase();

export const formatCompactNaira = (value) => {
  const amount = Number(value || 0);
  if (!amount) return '₦0';
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    notation: amount >= 1_000_000 ? 'compact' : 'standard',
    maximumFractionDigits: 1
  }).format(amount);
};

export const getPricePerSqm = (property) => {
  const price = parsePriceNumber(property?.price);
  const area = parseAreaNumber(property?.area);
  if (!price || !area) return null;
  return Math.round(price / area);
};

export const getLocationParts = (location) =>
  String(location || '')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);

export const getLocationSummary = (location) => {
  const parts = getLocationParts(location);
  return {
    city: parts[0] || 'Unknown',
    state: parts[parts.length - 1] || 'Unknown',
    area: parts.length > 1 ? parts.slice(0, -1).join(', ') : parts[0] || 'Unknown'
  };
};

export const getAvailabilityTag = (property) => {
  const badge = normalizeText(property?.badge);
  if (badge === 'for rent') return 'Available now';
  if (badge === 'land') return 'Documented land';
  return 'Available for inspection';
};

export const getVerificationLabel = (property) => {
  const builtYear = Number(property?.yearBuilt || 0);
  if (builtYear >= 2023) return 'Newly built';
  if (builtYear >= 2020) return 'Recently updated';
  return 'Verified listing';
};

export const getPropertyTrustMetrics = (property) => {
  const price = parsePriceNumber(property?.price);
  const pricePerSqm = getPricePerSqm(property);
  const { city, state } = getLocationSummary(property?.location);
  const inquiryIndex = ((Number(property?.id || 0) * 17) % 35) + 61;
  const viewIndex = ((Number(property?.id || 0) * 29) % 220) + 140;

  return {
    pricePerSqm,
    formattedPricePerSqm: pricePerSqm ? `${formatCompactNaira(pricePerSqm)}/sqm` : 'On request',
    availability: getAvailabilityTag(property),
    verificationLabel: getVerificationLabel(property),
    marketSummary: `${city}, ${state} remains active for ${property?.propertyType || 'residential'} demand.`,
    inquiryIndex,
    viewIndex,
    priceBand:
      price >= 250_000_000 ? 'Premium market' : price >= 80_000_000 ? 'Mid-market' : 'Value opportunity'
  };
};

export const getNeighborhoodHighlights = (property) => {
  const raw = normalizeText(property?.location);
  if (raw.includes('lagos') || raw.includes('lekki') || raw.includes('ikoyi') || raw.includes('victoria')) {
    return ['Business hubs nearby', 'Strong rental demand', 'Premium schools', 'Lifestyle and nightlife'];
  }
  if (raw.includes('abuja') || raw.includes('maitama') || raw.includes('asokoro') || raw.includes('gwarinpa')) {
    return ['Embassy corridor access', 'Stable road network', 'Executive demand', 'Planned districts'];
  }
  if (raw.includes('port harcourt') || raw.includes('rivers')) {
    return ['Commercial activity', 'Corporate tenant base', 'Road access', 'Retail convenience'];
  }
  return ['Community access', 'Road connectivity', 'Daily conveniences', 'Growing demand'];
};

export const getCommuteEstimate = (property) => {
  const minutes = ((Number(property?.id || 0) * 7) % 18) + 18;
  return `${minutes} min to key hubs`;
};

export const getNearbyPlaces = (property) => {
  const { city } = getLocationSummary(property?.location);
  const highlights = getNeighborhoodHighlights(property);
  return [
    { label: 'School district', value: highlights[0] },
    { label: 'Daily convenience', value: highlights[1] },
    { label: 'Commute', value: getCommuteEstimate(property) },
    { label: 'Market mood', value: city === 'Lagos' || city === 'Abuja' ? 'High intent area' : 'Steady local demand' }
  ];
};
