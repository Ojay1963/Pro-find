const cityCenters = {
  lagos: [6.5244, 3.3792],
  'lagos, lagos': [6.5244, 3.3792],
  lekki: [6.4478, 3.4788],
  'lekki phase 1': [6.4478, 3.4722],
  'lekki peninsula': [6.4698, 3.5856],
  ikoyi: [6.4474, 3.4422],
  'banana island': [6.4499, 3.4131],
  'victoria island': [6.4281, 3.4219],
  ikeja: [6.6018, 3.3515],
  surulere: [6.5006, 3.3581],
  yaba: [6.5095, 3.3711],
  ajah: [6.4654, 3.5852],
  'amuwo odofin': [6.4698, 3.2776],
  magodo: [6.6413, 3.3836],
  abuja: [9.0765, 7.3986],
  'abuja, fct': [9.0765, 7.3986],
  maitama: [9.0982, 7.4923],
  asokoro: [9.0444, 7.5342],
  garki: [9.0314, 7.4784],
  gwarinpa: [9.1083, 7.3985],
  'wuse 2': [9.0769, 7.4698],
  wuse: [9.0762, 7.4892],
  enugu: [6.4474, 7.5143],
  'independence layout': [6.4686, 7.5107],
  kaduna: [10.5105, 7.4165],
  ibadan: [7.3775, 3.947],
  bodija: [7.4375, 3.9083],
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
  'ado ekiti': [7.621, 5.2215],
  abakaliki: [6.3249, 8.1137],
  osogbo: [7.771, 4.5569],
  aba: [5.1066, 7.3667],
  nnewi: [6.019, 6.9173],
  ph: [4.8156, 7.0498],
  'port harcourt': [4.8156, 7.0498],
  'aba road': [4.8152, 7.0335],
  'birnin kebbi': [12.4539, 4.1975],
  lafia: [8.4939, 8.5153],
  dutse: [11.7562, 9.3381],
  gusau: [12.1704, 6.6641],
  sapele: [5.8941, 5.6767]
};

const toRadians = (value) => (value * Math.PI) / 180;

const hashString = (value) => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
};

export const resolveBaseCoords = (locationText) => {
  const normalized = String(locationText || '').toLowerCase();
  const entries = Object.entries(cityCenters).sort(([left], [right]) => right.length - left.length);
  for (const [key, coords] of entries) {
    if (normalized.includes(key)) {
      return coords;
    }
  }
  return [6.5244, 3.3792];
};

export const getCoordinates = (location, id) => {
  const base = resolveBaseCoords(location);
  const seed = hashString(`${location}-${id}`);
  const latOffset = ((seed % 120) - 60) / 5000;
  const lngOffset = ((Math.floor(seed / 120) % 120) - 60) / 5000;
  return [base[0] + latOffset, base[1] + lngOffset];
};

export const getDistanceKm = (from, to) => {
  if (!Array.isArray(from) || !Array.isArray(to)) {
    return null;
  }

  const [fromLat, fromLng] = from;
  const [toLat, toLng] = to;
  const earthRadiusKm = 6371;
  const dLat = toRadians(toLat - fromLat);
  const dLng = toRadians(toLng - fromLng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(fromLat)) *
      Math.cos(toRadians(toLat)) *
      Math.sin(dLng / 2) ** 2;

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export const formatDistanceKm = (distanceKm) => {
  if (typeof distanceKm !== 'number' || Number.isNaN(distanceKm)) {
    return '';
  }

  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m away`;
  }

  return `${distanceKm.toFixed(distanceKm < 10 ? 1 : 0)} km away`;
};

export const attachDistanceToProperty = (property, userCoords) => {
  if (!Array.isArray(userCoords)) {
    return property;
  }

  const coords = getCoordinates(property.location, property.id);
  const distanceKm = getDistanceKm(userCoords, coords);

  return {
    ...property,
    coords,
    distanceKm,
    distanceLabel: formatDistanceKm(distanceKm)
  };
};
