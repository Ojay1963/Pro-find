const ASABA_APARTMENT_FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=600&fit=crop'
];

const normalizeImageCandidate = (image) => {
  if (!image) return '';
  if (typeof image === 'string') return image;
  if (typeof image === 'object') return image.preview || image.url || '';
  return '';
};

export const getFallbackPropertyImages = () => [...ASABA_APARTMENT_FALLBACK_IMAGES];

export const getPropertyGallery = (property) => {
  const images = Array.isArray(property?.images)
    ? property.images.map(normalizeImageCandidate).filter(Boolean)
    : [];

  if (images.length > 0) return images;

  const cover = normalizeImageCandidate(property?.image);
  if (cover) return [cover, ...ASABA_APARTMENT_FALLBACK_IMAGES.slice(1)];

  return getFallbackPropertyImages();
};

export const getPropertyImage = (property, index = 0) => {
  const gallery = getPropertyGallery(property);
  return gallery[index] || gallery[0] || ASABA_APARTMENT_FALLBACK_IMAGES[0];
};

export const applyFallbackImage = (event, property, index = 0) => {
  const next = getPropertyImage(property, index);
  if (event?.target && event.target.src !== next) {
    event.target.onerror = null;
    event.target.src = next;
  }
};
